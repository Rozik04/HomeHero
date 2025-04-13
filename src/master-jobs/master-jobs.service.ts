import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMasterJobDto } from './dto/create-master-job.dto';
import { UpdateMasterJobDto } from './dto/update-master-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MasterJobsService {
  constructor(private readonly prisma:PrismaService){}

  async create(createMasterJobDto: CreateMasterJobDto) {
    let created = await this.prisma.masterJobs.create({data:{...createMasterJobDto}});
    return {created}
  }

  async findAll() {
    let allMasterJobs = await this.prisma.masterJobs.findMany({include:{
      level:{select:{nameEn:true,nameRu:true,nameUz:true}},
      product:{select:{nameEn:true,nameRu:true,nameUz:true}},
    }});
    if(!allMasterJobs.length){
      throw new BadRequestException("Not found jobs");
    }
    return {All:allMasterJobs};
  }

  async findOne(id: string) {
    let isJobExists = await this.prisma.masterJobs.findFirst({where:{id}});
    if(!isJobExists){
      throw new BadRequestException("Job not found")
    }
    return {found:isJobExists};
  }

  async update(id: string, updateMasterJobDto: UpdateMasterJobDto) {
    let isJobExists = await this.prisma.masterJobs.findFirst({where:{id}});
    if(!isJobExists){
      throw new BadRequestException("Job not found")
    }
    let updated = await this.prisma.masterJobs.update({where:{id},data:{...updateMasterJobDto}});
    return {updated};
  }

  async remove(id: string) {
    let isJobExists = await this.prisma.masterJobs.findFirst({where:{id}});
    if(!isJobExists){
      throw new BadRequestException("Job not found")
    }
    let deleted = await this.prisma.masterJobs.delete({where:{id}})
    return {deleted}
  }
}
