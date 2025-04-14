import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {promises as fs} from "fs"
import * as path from "path"

@Injectable()
export class PartnerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    let data = await this.prisma.partner.create({ data: { ...createPartnerDto } });
    return { data };
  }

  async findAll() {
    let alldata = await this.prisma.partner.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No partners found");
    }
    return { alldata };
  }

  async findOne(id: string) {
    let isPartnerExists = await this.prisma.partner.findFirst({ where: { id } });
    if (!isPartnerExists) {
      throw new BadRequestException("Partner not found");
    }
    return { Partner: isPartnerExists };
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    let isPartnerExists = await this.prisma.partner.findFirst({ where: { id } });
    if (!isPartnerExists) {
      throw new BadRequestException("Partner not found");
    }
    let updatedPartner = await this.prisma.partner.update({
      where: { id },
      data: { ...updatePartnerDto },
    });
    return { Updated: updatedPartner };
  }

  async remove(id: string) {
    let isPartnerExists = await this.prisma.partner.findFirst({ where: { id } });
    if (!isPartnerExists) {
      throw new BadRequestException("Partner not found");
    }
    if(isPartnerExists.image){
      let filepath = path.join(__dirname,"../../uploadPartners", isPartnerExists.image);
      fs.unlink(filepath);
    }
    let deletedPartner = await this.prisma.partner.delete({ where: { id } });
    return { Deleted: deletedPartner };
  }


  async updateImage(id: string, image:Express.Multer.File){
    let isPartnerExists = await this.prisma.partner.findFirst({where:{id}});
    if(!isPartnerExists){
      throw new BadRequestException("Not Partner found");
    }
    let oldImage = isPartnerExists.image;
    let filePath = path.join(__dirname,"../../uploadPartners",oldImage)
    fs.unlink(filePath);
    return {"Updated image": image.filename}
  }
}
