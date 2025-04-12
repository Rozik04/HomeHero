import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCon } from 'src/utils/multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Post('upload-image')
@UseInterceptors(FileInterceptor("image", multerCon))
uploadIm(@UploadedFile()image:Express.Multer.File){
  if(!image){
    return "Not image uploaded";
  }
  return {image:image.filename}
}

@Post("send-otp")
  sendOtp(@Body() data:{email:string}){
    return this.userService.sendOtp(data)
  }

  @Post("verify-otp")
  verifyOtp(@Body() data:{email:string, otp:string}){
    return this.userService.verifyOtp(data)
  }


  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  login(@Body() data:{email:string, password:string}){
    return this.userService.login(data)
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
