import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SizeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSizeDto: CreateSizeDto) {
    let data = await this.prisma.size.create({ data: { ...createSizeDto } });
    return { data };
  }

  async findAll() {
    let alldata = await this.prisma.size.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No sizes found");
    }
    return { alldata };
  }

  async findOne(id: string) {
    let isSizeExists = await this.prisma.size.findFirst({ where: { id } });
    if (!isSizeExists) {
      throw new BadRequestException("Size not found");
    }
    return { Size: isSizeExists };
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    let isSizeExists = await this.prisma.size.findFirst({ where: { id } });
    if (!isSizeExists) {
      throw new BadRequestException("Size not found");
    }
    let updatedSize = await this.prisma.size.update({
      where: { id },
      data: { ...updateSizeDto },
    });
    return { Updated: updatedSize };
  }

  async remove(id: string) {
    let isSizeExists = await this.prisma.size.findFirst({ where: { id } });
    if (!isSizeExists) {
      throw new BadRequestException("Size not found");
    }
    let deletedSize = await this.prisma.size.delete({ where: { id } });
    return { Deleted: deletedSize };
  }
}
