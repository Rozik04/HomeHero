import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketArrayDto, CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketArrayDto, UpdateBasketDto } from './dto/update-basket.dto';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';
import { Request as Reeeq } from 'express';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.individualuser, UserRole.legaluser])
  @Post()
  create(@Body() CreateBasketArrayDto: CreateBasketArrayDto, @Req() req: Reeeq) {
    return this.basketService.create(CreateBasketArrayDto, req);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin])
  @Get()
  findAll() {
    return this.basketService.findAll();
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    let userId = req.user.id;
    let role = req.user.role;
    return this.basketService.findOne(id,userId, role);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin])
  @Patch()
  update(@Request() req, @Body() UpdateBasketArrayDto: UpdateBasketArrayDto) {
    let userId = req.user.id;
    let role = req.user.role;
    return this.basketService.update(UpdateBasketArrayDto, userId, role); 
  }
  
  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    let userId = req.user.id;
    let role = req.user.role;
    return this.basketService.remove(id, userId, role);
  }
}
