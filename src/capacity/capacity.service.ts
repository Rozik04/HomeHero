import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CapacityService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCapacityDto: CreateCapacityDto) {
    let data = await this.prisma.capacity.create({data:{...createCapacityDto}});
    return {data}
  }

  async findAll() {
    let alldata = await this.prisma.capacity.findMany();
    if(!alldata.length){
      throw new BadRequestException("No capacities found");
    }
    return {alldata}
  }

  async findOne(id: string) {
    let isCapacityExists = await this.prisma.capacity.findFirst({where:{id}});
    if(!isCapacityExists){
      throw new BadRequestException("Capacity not found");
    }
    return {Capacity:isCapacityExists}
  }

  async update(id: string, updateCapacityDto: UpdateCapacityDto) {
    let isCapacityExists = await this.prisma.capacity.findFirst({where:{id}});
    if(!isCapacityExists){
      throw new BadRequestException("Capacity not found");
    }
    let updatedCapacity = await this.prisma.capacity.update({where:{id},data:{...updateCapacityDto}});
    return {Updated: updatedCapacity};
  }

  async remove(id: string) {
    let isCapacityExists = await this.prisma.capacity.findFirst({where:{id}});
    if(!isCapacityExists){
      throw new BadRequestException("Capacity not found");
    }
    let deletedCapacity = await this.prisma.capacity.delete({where:{id}})
    return {Deleted:deletedCapacity};
  }
}
