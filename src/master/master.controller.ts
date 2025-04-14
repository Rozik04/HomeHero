import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, UseGuards } from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {  multerMs, multerPs } from 'src/utils/multer';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Post('upload-image')
  @UseInterceptors(FileInterceptor("image", multerMs))
  uploadImage(@UploadedFile() image:Express.Multer.File){
    if(!image){
      throw new BadRequestException("File not uploaded");
    }
    return {image:image.filename}
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Post('upload-PassportImage')
  @UseInterceptors(FileInterceptor("image", multerPs))
  uploadPassportImage(@UploadedFile() image:Express.Multer.File){
    if(!image){
      throw new BadRequestException("File not uploaded");
    }
    return {image:image.filename}
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Post()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.create(createMasterDto);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Get()
  findAll() {
    return this.masterService.findAll();
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.masterService.update(id, updateMasterDto);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterService.remove(id);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Patch('update-image/:id')
  @UseInterceptors(FileInterceptor('image',multerMs))
  updateImage(@Param('id') id:string, @UploadedFile() image: Express.Multer.File){
    if(!image){
      return {error:"File not uploaded!"}
    }
    return this.masterService.updateImage(id, image);
    }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Patch('update-PassportImage/:id')
  @UseInterceptors(FileInterceptor('image',multerPs))
  updatePassportImage(@Param('id') id:string, @UploadedFile() image: Express.Multer.File){
    if(!image){
      return {error:"File not uploaded!"}
    }
    return this.masterService.updatePassportImage(id, image);
    }
}
