import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadGatewayException, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerPr } from 'src/utils/multer';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Post('upload-image')
  @UseInterceptors(FileInterceptor("image", multerPr))
  @ApiOperation({ summary: 'Upload an image to the server' })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({ description: 'Image file to upload',schema: { type: 'object', properties: { image: { type: 'string', format: 'binary', example: 'example.jpg',},}, },})
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
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }


  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Get()
  @ApiOperation({ summary: 'Get all products with filtering, sorting, pagination' })
  @ApiQuery({ name: 'search', required: false, type: String, example: '' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['nameRu', 'nameUz', 'nameEn'], example: 'nameUz' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], example: 'desc' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'List of all products with metadata.' })
  async findAll(@Query() query: any) {
    return this.productService.findAll(query);
  }


  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }


  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }


  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }


  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Patch('update-image/:id')
  @UseInterceptors(FileInterceptor('image',multerPr))
  @ApiOperation({ summary: 'Upload a new image to the server' })
  @ApiParam({ name: 'id', type: String })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({description: 'Image file to upload',schema: { type: 'object',properties: { image: { type: 'string', format: 'binary', example: 'example.jpg',}, }, },})
  @ApiResponse({ status: 200, description: 'Image updated successfully', type: Object })
  @ApiResponse({ status: 400, description: 'No image updated' })
  updateImage(@Param('id') id:string, @UploadedFile() image: Express.Multer.File){
    if(!image){
      return {error:"File not uploaded!"}
    }
    return this.productService.updateImage(id, image);
    }
}
