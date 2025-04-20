import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderMasterService } from './order-master.service';
import { CreateOrderMasterDto } from './dto/create-order-master.dto';
import { UpdateOrderMasterDto } from './dto/update-order-master.dto';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';

@Controller('order-master')
export class OrderMasterController {
  constructor(private readonly orderMasterService: OrderMasterService) {}

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Post()
  create(@Body() createOrderMasterDto: CreateOrderMasterDto) {
    return this.orderMasterService.create(createOrderMasterDto);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin])
  @Get()
  findAll() {
    return this.orderMasterService.findAll();
  }
}
