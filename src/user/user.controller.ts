import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Request, Req, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCon } from 'src/utils/multer';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';
import { CreateAdminDto, CreateOtpDto, loginDto, newPasswordDto, otpToResetPassword, RefreshTokenDto, verifyOtpDto } from 'src/utils/createOtp.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import  {Request as Requ,}  from 'express';
import { access } from 'fs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Post('upload-image')
@UseInterceptors(FileInterceptor("image", multerCon))
@ApiOperation({ summary: 'Upload an image to the server' })
@ApiConsumes('multipart/form-data') 
@ApiBody({description: 'Image file to upload', schema: { type: 'object', properties: { image: { type: 'string', format: 'binary', example: 'example.jpg', }, }, },})
@ApiResponse({ status: 200, description: 'Image uploaded successfully', type: Object })
@ApiResponse({ status: 400, description: 'No image uploaded' })
uploadIm(@UploadedFile()image:Express.Multer.File){
  if(!image){
    return "Not image uploaded";
  }
  return {image:image.filename}
}


@Post("send-otp")
sendOtp(@Body() data:CreateOtpDto){
    return this.userService.sendOtp(data)
  }


@Post("verify-otp")
verifyOtp(@Body() data:verifyOtpDto){
    return this.userService.verifyOtp(data)
  }


@Post('register')
register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }


@Post('login')
  login(@Request() req: Requ, @Body() loginDto: loginDto) {
    return this.userService.login(req, loginDto);
  }

  
@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin])
@Post('createAdmin')
  createAdmin(@Body() adminDto: CreateAdminDto){
    return this.userService.createAdmin(adminDto)
  }
  
  
@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin, UserRole.superadmin])
@Get()
@ApiOperation({ summary: 'Get all users' })
@ApiQuery({ name: 'search', required: false, type: String, description: 'Search by name or email' })
@ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'email'], description: 'Field to sort by' })
@ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Sort order' })
@ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
@ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
@ApiResponse({ status: 200, description: 'All users fetched successfully' })
@ApiResponse({ status: 400, description: 'No users found' })
findAll(@Query() query: any) {
  return this.userService.findAll(query);
}


@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin])
@Get("allSessions")
findAllSessions() {
  return this.userService.findAllSessions();
}
  

@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
@Get('myProfile')
myData(@Req() req: Requ) {
    return this.userService.myData(req);
  }


@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin])
@Get(':id')
findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }


@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
@Post('logout/:id')
logout(@Param('id') sessionId:string) {
    return this.userService.logout(sessionId);
  }


@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin])
@Patch(':id')
update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }


@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin, UserRole.superadmin])
@Patch('update-image/:id')
@UseInterceptors(FileInterceptor('image',multerCon))
@ApiOperation({ summary: 'Upload a new image to the server' })
@ApiParam({ name: 'id', type: String })
@ApiConsumes('multipart/form-data') 
@ApiBody({description: 'Image file to upload', schema: { type: 'object', properties: { image: { type: 'string', format: 'binary', example: 'example.jpg', }, },},})
@ApiResponse({ status: 200, description: 'Image updated successfully', type: Object })
@ApiResponse({ status: 400, description: 'No image updated' })
updateImage(@Param('id') id:string, @UploadedFile() image: Express.Multer.File){
    if(!image){
      return {error:"File not uploaded!"}
    }
    return this.userService.updateImage(id, image);
  }


@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin])
@Delete(':id')
remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }


@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
@Post("send-otp-reset")
sendOtpToReset(@Request() req){
    let userId = req.user.id;
    return this.userService.sendOtpToReset(userId)
  }


@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
@Post('refreshToken')
refreshToken(@Body() refreshToken:RefreshTokenDto){
  return this.userService.generateNewAccessToken(refreshToken)
}


@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
@Post("verify-otp-reset")
verifyOtpToReset(@Body() data:otpToResetPassword, @Request() req){
    let userId = req.user.id
    return this.userService.verifyOtpToReset(data, userId)
  }


@UseGuards(JwtAuthGuard, JwtRoleGuard)
@Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
@Post('reset-password')
resetPassword(@Request() req, @Body() data:newPasswordDto){
    let userId = req.user.id;
    return this.userService.resetPassword(data, userId)
  } 
}
