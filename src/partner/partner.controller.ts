import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';
import { multerPar } from 'src/utils/multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Post('upload-image')
  @UseInterceptors(FileInterceptor("image", multerPar))
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
  findAll() {
    return this.partnerService.findAll();
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
  updateImage(@Param('id') id:string, @UploadedFile() image: Express.Multer.File){
    if(!image){
      return {error:"File not uploaded!"}
    }
    return this.partnerService.updateImage(id, image);
    }
}
