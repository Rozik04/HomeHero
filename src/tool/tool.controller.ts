import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { ToolService } from './tool.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerUp } from 'src/utils/multer';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Post('upload-image')
  @UseInterceptors(FileInterceptor("image", multerUp))
  @ApiOperation({ summary: 'Upload an image to the server' })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({ description: 'Image file to upload', schema: { type: 'object', properties: { image: { type: 'string', format: 'binary', example: 'example.jpg',}, },}, })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully', type: Object })
  @ApiResponse({ status: 400, description: 'No image uploaded' })
  uploadIm(@UploadedFile()image:Express.Multer.File){
    if(!image){
      return "Not image uploaded";
    }
    return {image:image.filename}
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Post()
  async create(@Body() createToolDto: CreateToolDto) {
    return this.toolService.create(createToolDto)
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin, UserRole.vieweradmin])
  @Get()
  @ApiOperation({ summary: 'Get all tools' })
  @ApiResponse({ status: 200, description: 'List of all tools.' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['nameEn', 'nameRu', 'nameUz'], example: 'nameEn' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], example: 'asc' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query() query: any) {
    return this.toolService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolService.update(id, updateToolDto);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toolService.remove(id);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Patch('update-image/:id')
  @UseInterceptors(FileInterceptor("image", multerUp))
  @ApiOperation({ summary: 'Upload a new image to the server' })
  @ApiParam({ name: 'id', type: String })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({ description: 'Image file to upload', schema: { type: 'object', properties: { image: { type: 'string', format: 'binary', example: 'example.jpg',}, }, },})
  @ApiResponse({ status: 200, description: 'Image updated successfully', type: Object })
  @ApiResponse({ status: 400, description: 'No image updated' })
  updateImage(@Param('id') id:string, @UploadedFile() image:Express.Multer.File){
    if(!image){
      throw new BadRequestException("Image not uploaded");
    }
    return this.toolService.updateImage(id, image)
  }
}
