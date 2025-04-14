import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGeneralInfoDto } from './dto/create-general-info.dto';
import { UpdateGeneralInfoDto } from './dto/update-general-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GeneralInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGeneralInfoDto: CreateGeneralInfoDto) {
    let data = await this.prisma.generalInfo.create({ data: { ...createGeneralInfoDto } });
    return { data };
  }

  async findAll() {
    let alldata = await this.prisma.generalInfo.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No general info found");
    }
    return { alldata };
  }

  async findOne(id: string) {
    let isGeneralInfoExists = await this.prisma.generalInfo.findFirst({ where: { id } });
    if (!isGeneralInfoExists) {
      throw new BadRequestException("General info not found");
    }
    return { generalInfo: isGeneralInfoExists };
  }

  async update(id: string, updateGeneralInfoDto: UpdateGeneralInfoDto) {
    let isGeneralInfoExists = await this.prisma.generalInfo.findFirst({ where: { id } });
    if (!isGeneralInfoExists) {
      throw new BadRequestException("General info not found");
    }
    let updatedGeneralInfo = await this.prisma.generalInfo.update({
      where: { id },
      data: { ...updateGeneralInfoDto },
    });
    return { updated: updatedGeneralInfo };
  }

  async remove(id: string) {
    let isGeneralInfoExists = await this.prisma.generalInfo.findFirst({ where: { id } });
    if (!isGeneralInfoExists) {
      throw new BadRequestException("General info not found");
    }
    let deletedGeneralInfo = await this.prisma.generalInfo.delete({ where: { id } });
    return { deleted: deletedGeneralInfo };
  }
}
