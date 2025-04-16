import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sizes')
@Injectable()
export class SizeService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new size' })
  @ApiBody({ type: CreateSizeDto })
  @ApiResponse({ status: 201, description: 'The size has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createSizeDto: CreateSizeDto) {
    let data = await this.prisma.size.create({ data: { ...createSizeDto } });
    return { data };
  }

  @ApiOperation({ summary: 'Get all sizes' })
  @ApiResponse({ status: 200, description: 'List of all sizes.' })
  @ApiResponse({ status: 400, description: 'No sizes found.' })
  async findAll() {
    let alldata = await this.prisma.size.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No sizes found");
    }
    return { alldata };
  }

  @ApiOperation({ summary: 'Get a size by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Size ID' })
  @ApiResponse({ status: 200, description: 'The size with the given ID.' })
  @ApiResponse({ status: 400, description: 'Size not found.' })
  async findOne(id: string) {
    let isSizeExists = await this.prisma.size.findFirst({ where: { id } });
    if (!isSizeExists) {
      throw new BadRequestException("Size not found");
    }
    return { Size: isSizeExists };
  }

  @ApiOperation({ summary: 'Update a size by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Size ID' })
  @ApiBody({ type: UpdateSizeDto }) 
  @ApiResponse({ status: 200, description: 'The size has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Size not found.' })
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

  @ApiOperation({ summary: 'Delete a size by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Size ID' })
  @ApiResponse({ status: 200, description: 'The size has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Size not found.' })
  async remove(id: string) {
    let isSizeExists = await this.prisma.size.findFirst({ where: { id } });
    if (!isSizeExists) {
      throw new BadRequestException("Size not found");
    }
    let deletedSize = await this.prisma.size.delete({ where: { id } });
    return { Deleted: deletedSize };
  }
}
