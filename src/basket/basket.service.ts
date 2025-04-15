import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BasketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBasketDto: CreateBasketDto, userId:string) {
    let checkLevel = await this.prisma.product.findFirst({where:{id:createBasketDto.productID,levels:{some:{levelID:createBasketDto.levelID}}}});
    if(!checkLevel){
      throw new BadRequestException("This level is not linked to this product.")
    }
    let checkTool = await this.prisma.product.findFirst({where:{id:createBasketDto.productID,tools:{some:{toolID:createBasketDto.toolID}}}});
    if(!checkTool){
      throw new BadRequestException("This tool is not linked to this product.")
    }
    let data = await this.prisma.basket.create({ data: { ...createBasketDto, userID:userId } });
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
