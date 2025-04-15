import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BasketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBasketDto: CreateBasketDto) {
    let data = await this.prisma.basket.create({ data: { ...createBasketDto } });
    return { data };
  }

  async findAll() {
    let alldata = await this.prisma.basket.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No baskets found");
    }
    return { alldata };
  }

  async findOne(id: string) {
    let isBasketExists = await this.prisma.basket.findFirst({ where: { id } });
    if (!isBasketExists) {
      throw new BadRequestException("Basket not found");
    }
    return { Basket: isBasketExists };
  }

  async update(id: string, updateBasketDto: UpdateBasketDto) {
    let isBasketExists = await this.prisma.basket.findFirst({ where: { id } });
    if (!isBasketExists) {
      throw new BadRequestException("Basket not found");
    }
    let updatedBasket = await this.prisma.basket.update({
      where: { id },
      data: { ...updateBasketDto },
    });
    return { Updated: updatedBasket };
  }

  async remove(id: string) {
    let isBasketExists = await this.prisma.basket.findFirst({ where: { id } });
    if (!isBasketExists) {
      throw new BadRequestException("Basket not found");
    }
    let deletedBasket = await this.prisma.basket.delete({ where: { id } });
    return { Deleted: deletedBasket };
  }
}
