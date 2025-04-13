import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LevelService {
  constructor(private readonly prisma: PrismaService){}

  async create(createLevelDto: CreateLevelDto) {
    let data = await this.prisma.level.create({data:{...createLevelDto}});
    return {data}
  }

  async findAll() {
    let alldata = await this.prisma.level.findMany();
    if(!alldata.length){
      throw new BadRequestException("No levels found");
    }
    return {alldata}
  }

  async findOne(id: string) {
    let isLevelExists = await this.prisma.level.findFirst({where:{id}});
    if(!isLevelExists){
      throw new BadRequestException("Level not found");
    }
    return {Level: isLevelExists}
  }

  async update(id: string, updateLevelDto: UpdateLevelDto) {
    let isLevelExists = await this.prisma.level.findFirst({where:{id}});
    if(!isLevelExists){
      throw new BadRequestException("Level not found");
    }
    let updatedLevel = await this.prisma.level.update({where:{id}, data:{...updateLevelDto}});
    return {Updated: updatedLevel};
  }

  async remove(id: string) {
    let isLevelExists = await this.prisma.level.findFirst({where:{id}});
    if(!isLevelExists){
      throw new BadRequestException("Level not found");
    }
    let deletedLevel = await this.prisma.level.delete({where:{id}});
    return {Deleted: deletedLevel};
  }
}
