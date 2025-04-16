import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('brands')
@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new brand' })
  @ApiBody({ type: CreateBrandDto })
  @ApiResponse({ status: 201, description: 'The brand has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createBrandDto: CreateBrandDto) {
    let data = await this.prisma.brand.create({ data: { ...createBrandDto } });
    return { data };
  }


  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, description: 'List of all brands.' })
  @ApiResponse({ status: 400, description: 'No brands found.' })
  async findAll() {
    let alldata = await this.prisma.brand.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No brands found");
    }
    return { alldata };
  }

  @ApiOperation({ summary: 'Get a brand by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'The brand with the given ID.' })
  @ApiResponse({ status: 400, description: 'Brand not found.' })
  async findOne(id: string) {
    let isBrandExists = await this.prisma.brand.findFirst({ where: { id } });
    if (!isBrandExists) {
      throw new BadRequestException("Brand not found");
    }
    return { Brand: isBrandExists };
  }

  @ApiOperation({ summary: 'Update a brand by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Brand ID' })
  @ApiBody({ type: UpdateBrandDto }) 
  @ApiResponse({ status: 200, description: 'The brand has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Brand not found.' })
  async update(id: string, updateBrandDto: UpdateBrandDto) {
    let isBrandExists = await this.prisma.brand.findFirst({ where: { id } });
    if (!isBrandExists) {
      throw new BadRequestException("Brand not found");
    }
    let updatedBrand = await this.prisma.brand.update({
      where: { id },
      data: { ...updateBrandDto },
    });
    return { Updated: updatedBrand };
  }

  @ApiOperation({ summary: 'Delete a brand by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'The brand has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Brand not found.' })
  async remove(id: string) {
    let isBrandExists = await this.prisma.brand.findFirst({ where: { id } });
    if (!isBrandExists) {
      throw new BadRequestException("Brand not found");
    }
    let deletedBrand = await this.prisma.brand.delete({ where: { id } });
    return { Deleted: deletedBrand };
  }
}
