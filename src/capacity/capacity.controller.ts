import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CapacityService } from './capacity.service';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';

@Controller('capacity')
export class CapacityController {
  constructor(private readonly capacityService: CapacityService) {}

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Post()
  create(@Body() createCapacityDto: CreateCapacityDto) {
    return this.capacityService.create(createCapacityDto);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Get()
  findAll() {
    return this.capacityService.findAll();
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capacityService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCapacityDto: UpdateCapacityDto) {
    return this.capacityService.update(id, updateCapacityDto);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capacityService.remove(id);
  }
}
