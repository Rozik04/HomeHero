import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketArrayDto, CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketArrayDto, UpdateBasketDto } from './dto/update-basket.dto';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Post()
  create(@Body() CreateBasketArrayDto: CreateBasketArrayDto, @Request() req) {
    let userId = req.user.id;
    return this.basketService.create(CreateBasketArrayDto, userId);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Get()
  findAll() {
    return this.basketService.findAll();
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Patch()
  update(@Request() req, @Body() UpdateBasketArrayDto: UpdateBasketArrayDto) {
    let userId = req.user.id;
    return this.basketService.update(UpdateBasketArrayDto, userId); 
  }
  
  // @UseGuards(JwtAuthGuard, JwtRoleGuard)
  // @Roles([UserRole.admin, UserRole.vieweradmin, UserRole.individualuser, UserRole.superadmin, UserRole.legaluser])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.remove(id);
  }
}
