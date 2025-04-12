import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
import { generateOtp } from 'src/utils/util.functions';
import * as bcrypt from 'bcrypt'
dotenv.config()

let storeOtp: {[key:string]:string}={};

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  private transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user: process.env.USER,
      pass: process.env.PASS
    }
  })

  async sendOtp(data:{email:string}):Promise<{otp: string}>{
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

  async verifyOtp(data:{email: string, otp: string}) {
    let {email, otp} = data;    
    if (storeOtp[email] === otp) {
      await this.prisma.user.update({where:{email},data:{status:"active"}})
      delete storeOtp[email]

    return {message:"Otp verified successfully!"};
    }
    return {error:"Wrong otp!"}; 
  }

  async register(createUserDto: CreateUserDto) {    
    let isUserExists = await this.prisma.user.findFirst({where:{email:createUserDto.email}});
    if(!isUserExists||isUserExists.status!='active'){
      throw new BadRequestException("This email not verified yet")
    }
    let hash = bcrypt.hashSync(isUserExists.password, 10)
    let newUser = await this.prisma.user.update({where:{email:createUserDto.email},data:{...createUserDto, password:hash}});
    return {"Registered successfully":newUser}
  }

  async login(data:{email:string, password:string}){
    let {email, password} = data;
    let isUserExists = await this.prisma.user.findFirst({where:{email}});
    if(!isUserExists){
      throw new BadRequestException("This email not registered yet!");
    }
    let compPass = bcrypt.compare(isUserExists.password, password);
    if(!compPass){
      throw new BadRequestException("Wrong password!");
    }
     return {"You are logged in":isUserExists}
    
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
