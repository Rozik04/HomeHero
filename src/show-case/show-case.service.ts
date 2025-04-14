import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShowCaseDto } from './dto/create-show-case.dto';
import { UpdateShowCaseDto } from './dto/update-show-case.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class ShowCaseService {
  constructor(private prisma: PrismaService) {}

  async create(createShowCaseDto: CreateShowCaseDto) {
    const created = await this.prisma.showCase.create({
      data: { ...createShowCaseDto },
    });
    return { created };
  }

  async findAll() {
    const allShowCases = await this.prisma.showCase.findMany();
    if (!allShowCases.length) {
      throw new BadRequestException('No ShowCases found');
    }
    return { ShowCases: allShowCases };
  }

  async findOne(id: string) {
    const isShowCaseExists = await this.prisma.showCase.findFirst({
      where: { id },
    });
    if (!isShowCaseExists) {
      throw new BadRequestException('ShowCase not found');
    }
    return { found: isShowCaseExists };
  }

  async update(id: string, updateShowCaseDto: UpdateShowCaseDto) {
    const isShowCaseExists = await this.prisma.showCase.findFirst({
      where: { id },
    });
    if (!isShowCaseExists) {
      throw new BadRequestException('ShowCase not found');
    }
    const updated = await this.prisma.showCase.update({
      where: { id },
      data: { ...updateShowCaseDto },
    });
    return { updated };
  }

  async remove(id: string) {
    const isShowCaseExists = await this.prisma.showCase.findFirst({
      where: { id },
    });
    if (!isShowCaseExists) {
      throw new BadRequestException('ShowCase not found');
    }

    if (isShowCaseExists.image) {
      const filepath = path.join(__dirname, '../../uploadShowCases', isShowCaseExists.image);
      fs.unlink(filepath);
    }

    const deleted = await this.prisma.showCase.delete({
      where: { id },
    });
    return { deleted };
  }

  async updateImage(id: string, image: Express.Multer.File) {
    const isShowCaseExists = await this.prisma.showCase.findFirst({
      where: { id },
    });
    if (!isShowCaseExists) {
      throw new BadRequestException('ShowCase not found');
    }

    const oldImage = isShowCaseExists.image;
    const filePath = path.join(__dirname, '../../uploadShowCases', oldImage);
    fs.unlink(filePath);
    
    // Yangisini saqlamayapsiz, faqat filename qaytarilyapti
    return { 'Updated image': image.filename };
  }
}
