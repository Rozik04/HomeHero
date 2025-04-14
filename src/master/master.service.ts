import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {promises as fs} from "fs";
import * as path from 'path'

@Injectable()
export class MasterService {
  constructor(private prisma:PrismaService){}

  async create(createMasterDto: CreateMasterDto) {
    let created = await this.prisma.master.create({data:{...createMasterDto}});
    return {created};
  }

  async findAll() {
    let allmasters = await this.prisma.master.findMany();
      if(!allmasters.length){
        throw new BadRequestException("Not found masters");
      }
    return {Master:allmasters};
  }

  async findOne(id: string) {
    let isMasterExists = await this.prisma.master.findFirst({where:{id}});
    if(!isMasterExists){
      throw new BadRequestException("Master not found")
    }
    return {found:isMasterExists};
  }

  async update(id: string, updateMasterDto: UpdateMasterDto) {
    let isMasterExists = await this.prisma.master.findFirst({where:{id}});
    if(!isMasterExists){
      throw new BadRequestException("Master not found")
    }
    let updated = await this.prisma.master.update({where:{id},data:{...updateMasterDto}});
    return {updated};
  }

  async remove(id: string) {
    let isMasterExists = await this.prisma.master.findFirst({ where: { id } });
    if (!isMasterExists) {
      throw new BadRequestException("Master not found");
    }
    if(isMasterExists.image&&isMasterExists.passportImage){
      let filepath = path.join(__dirname,"../../uploadMasters", isMasterExists.image);
      let filepath2 = path.join(__dirname,"../../uploadPassports", isMasterExists.passportImage);
      fs.unlink(filepath);
      fs.unlink(filepath2)
    }
    let deletedMaster = await this.prisma.master.delete({ where: { id } });
    return { Deleted: deletedMaster };
  }

  async updateImage(id: string, image:Express.Multer.File){
    let isMasterExists = await this.prisma.master.findFirst({where:{id}});
    if(!isMasterExists){
      throw new BadRequestException("Not Master found");
    }
    let oldImage = isMasterExists.image;
    let filePath = path.join(__dirname,"../../uploadMasters",oldImage)
    fs.unlink(filePath);
    return {"Updated image": image.filename}
  }

  async updatePassportImage(id: string, image:Express.Multer.File){
    let isMasterExists = await this.prisma.master.findFirst({where:{id}});
    if(!isMasterExists){
      throw new BadRequestException("Not Master found");
    }
    let oldImage = isMasterExists.passportImage;
    let filePath = path.join(__dirname,"../../uploadPassports",oldImage)
    fs.unlink(filePath);
    return {"Updated image": image.filename}
  }
}
