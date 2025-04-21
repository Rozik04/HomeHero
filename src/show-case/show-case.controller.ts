import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ShowCaseService } from './show-case.service';
import { CreateShowCaseDto } from './dto/create-show-case.dto';
import { UpdateShowCaseDto } from './dto/update-show-case.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerMs, multerShow } from 'src/utils/multer';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('showcase')
export class ShowCaseController {
  constructor(private readonly showCaseService: ShowCaseService) {}

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image', multerShow))
  @ApiOperation({ summary: 'Upload an image to the server' })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({ description: 'Image file to upload', schema: { type: 'object', properties: { image: { type: 'string', format: 'binary', example: 'example.jpg', }, }, }, })
  @ApiResponse({ status: 200, description: 'Passport image uploaded successfully', type: Object })
  @ApiResponse({ status: 400, description: 'No passport image uploaded' })
  uploadImage(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('File not uploaded');
    }
    return { image: image.filename };
  }

  
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Post()
  create(@Body() createShowCaseDto: CreateShowCaseDto) {
    return this.showCaseService.create(createShowCaseDto);
  }


  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin])
  @Get()
  findAll() {
    return this.showCaseService.findAll();
  }


  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showCaseService.findOne(id);
  }


  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowCaseDto: UpdateShowCaseDto) {
    return this.showCaseService.update(id, updateShowCaseDto);
  }


  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showCaseService.remove(id);
  }


  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin])
  @Patch('update-image/:id')
  @UseInterceptors(FileInterceptor('image', multerShow))
  updateImage(@Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
    if (!image) {
      return { error: 'File not uploaded!' };
    }
    return this.showCaseService.updateImage(id, image);
  }
}
