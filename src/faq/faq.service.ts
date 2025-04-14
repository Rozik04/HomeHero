import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFaqDto: CreateFaqDto) {
    let data = await this.prisma.fAQ.create({ data: { ...createFaqDto } });
    return { data };
  }

  async findAll() {
    let allData = await this.prisma.fAQ.findMany();
    if (!allData.length) {
      throw new BadRequestException('No FAQs found');
    }
    return { allData };
  }

  async findOne(id: string) {
    let isFaqExists = await this.prisma.fAQ.findFirst({ where: { id } });
    if (!isFaqExists) {
      throw new BadRequestException('FAQ not found');
    }
    return { FAQ: isFaqExists };
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    let isFaqExists = await this.prisma.fAQ.findFirst({ where: { id } });
    if (!isFaqExists) {
      throw new BadRequestException('FAQ not found');
    }
    let updatedFaq = await this.prisma.fAQ.update({
      where: { id },
      data: { ...updateFaqDto },
    });
    return { Updated: updatedFaq };
  }

  async remove(id: string) {
    let isFaqExists = await this.prisma.fAQ.findFirst({ where: { id } });
    if (!isFaqExists) {
      throw new BadRequestException('FAQ not found');
    }
    let deletedFaq = await this.prisma.fAQ.delete({ where: { id } });
    return { Deleted: deletedFaq };
  }
}
