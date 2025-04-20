import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GeneralInfoService } from './general-info.service';
import { CreateGeneralInfoDto } from './dto/create-general-info.dto';
import { UpdateGeneralInfoDto } from './dto/update-general-info.dto';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';

@Controller('general-info')
export class GeneralInfoController {
  constructor(private readonly generalInfoService: GeneralInfoService) {}

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Post()
  create(@Body() createGeneralInfoDto: CreateGeneralInfoDto) {
    return this.generalInfoService.create(createGeneralInfoDto);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin])
  @Get()
  findAll() {
    return this.generalInfoService.findAll();
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalInfoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneralInfoDto: UpdateGeneralInfoDto) {
    return this.generalInfoService.update(id, updateGeneralInfoDto);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalInfoService.remove(id);
  }
}
