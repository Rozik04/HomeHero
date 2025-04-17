import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Query } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';
import { multerPar } from 'src/utils/multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Post('upload-image')
  @UseInterceptors(FileInterceptor("image", multerPar))
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
  uploadImage(@UploadedFile() image:Express.Multer.File){
    if(!image){
      throw new BadRequestException("File not uploaded");
    }
    return {image:image.filename}
  }
  
  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnerService.create(createPartnerDto);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Get()
  @ApiOperation({ summary: 'Get all partners with search, sort, and pagination' })
  @ApiQuery({ name: 'search', required: false, description: 'Search by name (Ru, Uz, En)' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['nameRu', 'nameUz', 'nameEn'], description: 'Sort by field' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Sort order' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default 10)' })
  @ApiResponse({ status: 200, description: 'List of all partners.' })
  @ApiResponse({ status: 400, description: 'No partners found.' })
  async findAll(@Query() query: any) {
    return this.partnerService.findAll(query);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnerService.update(id, updatePartnerDto);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerService.remove(id);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Patch('update-image/:id')
  @UseInterceptors(FileInterceptor('image',multerPar))
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
    return this.partnerService.updateImage(id, image);
    }
}
