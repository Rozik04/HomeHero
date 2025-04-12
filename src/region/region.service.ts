import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor( private readonly prisma : PrismaService){}
  
  async create(createRegionDto: CreateRegionDto) {
    let isRegionExists = await this.prisma.region.findFirst({where:{nameUz:createRegionDto.nameUz, nameEn:createRegionDto.nameEn, nameRu:createRegionDto.nameRu}});
    if(isRegionExists){
      throw new BadRequestException("This region already exists!");
    }
    let data = await this.prisma.region.create({data:{...createRegionDto}});
    return {"Created region":data}
  }

  async findAll() {
   let allRegions = await this.prisma.region.findMany();
   if(!allRegions.length){
    throw new BadRequestException("No regions found!")
  }
  return {"All regions:": allRegions}
  }

  async findOne(id: string) {
    let isRegionExists = await this.prisma.region.findFirst({where:{id}});
    if(!isRegionExists){
      throw new BadRequestException("Region not found");
    }
    return {"Region":isRegionExists};
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    let isRegionExists = await this.prisma.region.findFirst({where:{id}});
    if(!isRegionExists){
      throw new BadRequestException("Region not found!");
    }
    let updatedRegion = await this.prisma.region.update({where:{id},data:{...updateRegionDto}});
    return {"Updated region": updatedRegion}
  }

  async remove(id: string) {
    let isRegionExists = await this.prisma.region.findFirst({where:{id}});
    if(!isRegionExists){
      throw new BadRequestException("Not found region!");
    }
    let deletedRegion = await this.prisma.region.delete({where:{id}});
    return {"Deleted region":deletedRegion}
  }
}
