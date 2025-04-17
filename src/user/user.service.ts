import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
import { generateOtp } from 'src/utils/util.functions';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { promises as fs} from 'fs';
import * as path from 'path';
import { UserRole } from 'src/utils/enums';
import { Request, Response } from 'express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOtpDto, loginDto, newPasswordDto, otpToResetPassword, verifyOtpDto } from 'src/utils/createOtp.dto';
import { Prisma } from 'generated/prisma';
dotenv.config()

let otpVerifiedUsers: Record<string, boolean> = {};
let storeOtp: {[key:string]:string}={};

@ApiTags('users')
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService){}

  private transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user: process.env.USER,
      pass: process.env.PASS
    }
  }) 

  @ApiOperation({ summary: 'Send OTP to user email' })
  @ApiBody({type: CreateOtpDto})
  @ApiResponse({ status: 201, description: 'OTP sent successfully' })
  @ApiResponse({ status: 500, description: 'Failed to send OTP' })
  async sendOtp(data:CreateOtpDto):Promise<{otp: string}>{
    let {email} =  data;
    
    let otp = generateOtp()
    storeOtp[email] = otp
    setTimeout(()=>{
     delete storeOtp[email]}, 10*60*1000
    )
  let options = {
    from : process.env.USER,
    to: email,
    subject: "Your otp code",
    text:`Your otp code: ${otp}`
  }

  try {
    await this.transporter.sendMail(options); 
    await this.prisma.user.create({data:{nameRu:"No Data", nameEn:"No Data", nameUz:"No Data", email, password:"No Data",phone:"No Data",image:"No Data",role:"individualuser",status:"passive",location:"No data", regionID:null}})  
    return { otp: 'OTP sent successfully' };  
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
  }

  @ApiOperation({ summary: 'Verify OTP' })
  @ApiBody({ type: verifyOtpDto })
  @ApiResponse({ status: 200, description: 'Otp verified successfully!' })
  @ApiResponse({ status: 400, description: 'Wrong OTP' })
  async verifyOtp(data:verifyOtpDto){
    let {email, otp} = data;    
    if (storeOtp[email] === otp) {
      await this.prisma.user.update({where:{email},data:{status:"active"}})
      delete storeOtp[email]

    return {message:"Otp verified successfully!"};
    }
    return {error:"Wrong otp!"}; 
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data or unverified email' })
  async register(createUserDto: CreateUserDto){    
    let isUserExists = await this.prisma.user.findFirst({where:{email:createUserDto.email}});
    if(!isUserExists||isUserExists.status!='active'){
      throw new BadRequestException("This email not verified yet")
    }
    console.log(createUserDto.password);
    let hash = await bcrypt.hash(createUserDto.password, 10)
    console.log(hash);
    if(createUserDto.role==UserRole.legaluser){
      if(!createUserDto.inn||!createUserDto.passportSeries){
        throw new BadRequestException("The documents have not been fully entered!")
      } 
    }
    if(createUserDto.role!=UserRole.legaluser){
      if(createUserDto.inn||createUserDto.passportSeries){
        throw new BadRequestException("Only legal users can enter the documents!")
      } 
    }
    if([UserRole.admin, UserRole.superadmin, UserRole.vieweradmin].includes(createUserDto.role)){
      throw new BadRequestException("Registration as an admin is prohibited!")
    } 

    let newUser = await this.prisma.user.update({where:{email:createUserDto.email},data:{...createUserDto, password:hash}});
    return {"Registered successfully":newUser}
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({type: loginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Invalid email or password' })
  async login(data:loginDto){
    let {email, password} = data;
    let isUserExists = await this.prisma.user.findFirst({where:{email}});
    if(!isUserExists){
      throw new BadRequestException("This email not registered yet!");
    }
    
    let compPass = await bcrypt.compare(password, isUserExists.password,);
    
    if(!compPass){
      throw new BadRequestException("Wrong password!");
    }
    let accessToken = this.jwt.sign({id:isUserExists.id, role:isUserExists.role})
    const refreshToken = this.jwt.sign({id:isUserExists.id, role:isUserExists.role},{expiresIn:'7d'});

     return {"You are logged in":isUserExists, accessToken, refreshToken}
    
  }

  async findAll(query: any) {
    const {
      search,
      sortBy = 'nameUz',
      order = 'asc',
      page = 1,
      limit = 10,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            {
              nameUz: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
              nameEn: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
              nameRu: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              email: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: Number(skip),
        take: Number(limit),
        include: {
          region: {
            select: {
              nameUz: true,
              nameRu: true,
              nameEn: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      meta: {
        total,
        page: Number(page),
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(id: string){
    let isUserExists = await this.prisma.user.findFirst({where:{id},include:{region:{select:{nameUz:true, nameRu:true, nameEn:true}}}});
    if(!isUserExists){
      throw new BadRequestException("Not found user!")
    }
    return {User:isUserExists}
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async update(id: string, updateUserDto: UpdateUserDto){
    let isUserExists = await this.prisma.user.findFirst({where:{id}});
    if(!isUserExists){
      throw new BadRequestException("Not found user");
    }
    let hashedPass;
    if(isUserExists.password){
      hashedPass = bcrypt.hashSync(isUserExists.password, 10);
    }
    let updatedUser = await this.prisma.user.update({where:{id}, data:{...updateUserDto, password:hashedPass}})
    return {"Updated user": updatedUser}
  }


  @ApiParam({ name: 'id', type: String })
  async updateImage(id: string, image:Express.Multer.File){
    let isUserExists = await this.prisma.user.findFirst({where:{id}});
    if(!isUserExists){
      throw new BadRequestException("Not user found");
    }
    let oldImage = isUserExists.image;
    let filePath = path.join(__dirname,"../../uploads",oldImage)
    fs.unlink(filePath);
    return {"Updated image": image.filename}
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async remove(id: string){
    let isUserExists = await this.prisma.user.findFirst({where:{id}});
    if(!isUserExists){
      throw new BadRequestException("Not found user!");
    }

try {
  let filePath = path.join(__dirname,"../../uploads",isUserExists.image);
  await fs.unlink(filePath);
} catch (error) {
  return {error:error.message}
}

    let deletedUser = await this.prisma.user.delete({where:{id}});
    return {"Deleted user":deletedUser}
  }


  @ApiOperation({ summary: 'Send OTP for password reset' })
  @ApiParam({ name: 'userId', type: String })
  @ApiResponse({ status: 200, description: 'OTP sent to email successfully' })
  @ApiResponse({ status: 400, description: 'User not found or failed to send OTP' })
  async sendOtpToReset(userId:string){
    let data = await this.prisma.user.findFirst({where:{id:userId}});
    if(!data){
      throw new BadRequestException("User not found!");
    }
    let email = data.email;

    let otp = generateOtp()
    storeOtp[email] = otp
    setTimeout(()=>{
     delete storeOtp[email]}, 10*60*1000
    )
  let options = {
    from : process.env.USER,
    to: email,
    subject: "Your otp code",
    text:`Verify this otp to reset password: ${otp}`
  }

  try {
    await this.transporter.sendMail(options); 
    return { Message: 'Check your email and verify otp!' };  
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
  }

  @ApiOperation({ summary: 'Verify OTP to reset password' })
  @ApiBody({type:otpToResetPassword})
  @ApiResponse({ status: 200, description: 'Otp verified successfully' })
  @ApiResponse({ status: 400, description: 'User not found or wrong OTP' })
  async verifyOtpToReset(data:otpToResetPassword, userId:string){
    let{otp} = data;
    let isUserExists = await this.prisma.user.findFirst({where:{id:userId}});
    if(!isUserExists){
      throw new BadRequestException("User not found!")
    }
    let email = isUserExists.email;
    if (storeOtp[email] === otp) {
      delete storeOtp[email]
      otpVerifiedUsers[userId] = true;
    return {message:"Otp verified successfully, now you can reset your password!"};
    }
    return {error:"Wrong otp!"}; 
  }

  @ApiOperation({ summary: 'Reset password after OTP verification' })
  @ApiBody({type:newPasswordDto})
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'OTP not verified or error occurred' })
  async resetPassword(data:newPasswordDto, userId:string){
    let {newPassword} = data;
    if (!otpVerifiedUsers[userId]) {
      throw new BadRequestException("You are not allowed to reset password without OTP verification!");
    }
    try {
      let hash = bcrypt.hashSync(newPassword, 10)      
      await this.prisma.user.update({where:{id:userId}, data:{password:hash}});
      delete otpVerifiedUsers[userId]
      return {Success:"Your password has been successfully changed!"}
    } catch (error) {
      throw new BadRequestException({error:error.message})
    }

  }
}

