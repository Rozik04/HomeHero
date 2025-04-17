import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {  multerMs, multerPs } from 'src/utils/multer';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}



  
  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Post('upload-image')
  @UseInterceptors(FileInterceptor("image", multerMs))
    @ApiOperation({ summary: 'Upload an image to the server' })
    @ApiConsumes('multipart/form-data') 
    @ApiBody({
      description: 'Image file to upload',
      schema: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            format: 'binary',
            example: 'example.jpg',
          },
        },
      },
    })
    @ApiResponse({ status: 200, description: 'Image uploaded successfully', type: Object })
    @ApiResponse({ status: 400, description: 'No image uploaded' })
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
  @ApiOperation({ summary: 'Upload an image to the server' })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    description: 'Image file to upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          example: 'example.jpg',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Passport image uploaded successfully', type: Object })
  @ApiResponse({ status: 400, description: 'No passport image uploaded' })
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
  @ApiOperation({ summary: 'Get all masters' })
  @ApiResponse({ status: 200, description: 'List of all masters.' })
  @ApiResponse({ status: 400, description: 'No masters found.' })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'Ali' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'createdAt'], example: 'name' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], example: 'asc' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query() query: any) {
    return this.masterService.findAll(query);
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
  @ApiOperation({ summary: 'Upload a new image to the server' })
  @ApiParam({ name: 'id', type: String })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
         description: 'Image file to upload',
         schema: {
           type: 'object',
           properties: {
             image: {
               type: 'string',
               format: 'binary',
               example: 'example.jpg',
             },
           },
         },
       })
       @ApiResponse({ status: 200, description: 'Image updated successfully', type: Object })
       @ApiResponse({ status: 400, description: 'No image updated' })
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
  @ApiOperation({ summary: 'Upload a new passport image to the server' })
  @ApiParam({ name: 'id', type: String })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    description: 'Passport image file to upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          example: 'example.jpg',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Passport image updated successfully', type: Object })
  @ApiResponse({ status: 400, description: 'No passport image updated' })
  updatePassportImage(@Param('id') id:string, @UploadedFile() image: Express.Multer.File){
    if(!image){
      return {error:"File not uploaded!"}
    }
    return this.masterService.updatePassportImage(id, image);
    }
}
