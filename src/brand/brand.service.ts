import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService){}

  async create(createBrandDto: CreateBrandDto) {
    let data = await this.prisma.brand.create({data:{...createBrandDto}});
    return {data}
  }

  async findAll() {
    let alldata = await this.prisma.brand.findMany();
    if(!alldata.length){
      throw new BadRequestException("No brands found");
    }
    return {alldata}
  }

  async findOne(id: string) {
    let isBrandExists = await this.prisma.brand.findFirst({where:{id}});
    if(!isBrandExists){
      throw new BadRequestException("Brand not found");
    }
    return {Brand:isBrandExists}
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    let isBrandExists = await this.prisma.brand.findFirst({where:{id}});
    if(!isBrandExists){
      throw new BadRequestException("Brand not found");
    }
    let updatedBrand = await this.prisma.brand.update({where:{id},data:{...updateBrandDto}});
    return {Updated: updatedBrand};
  }

  async remove(id: string) {
    let isBrandExists = await this.prisma.brand.findFirst({where:{id}});
    if(!isBrandExists){
      throw new BadRequestException("Brand not found");
    }
    let deletedBrand = await this.prisma.brand.delete({where:{id}})
    return {Deleted:deletedBrand};
  }
}
