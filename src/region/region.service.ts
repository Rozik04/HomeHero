import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('regions')
@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new region' })
  @ApiBody({ type: CreateRegionDto })
  @ApiResponse({ status: 201, description: 'The region has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createRegionDto: CreateRegionDto) {
    let data = await this.prisma.region.create({ data: { ...createRegionDto } });
    return { data };
  }

  @ApiOperation({ summary: 'Get all regions' })
  @ApiResponse({ status: 200, description: 'List of all regions.' })
  @ApiResponse({ status: 400, description: 'No regions found.' })
  async findAll() {
    let alldata = await this.prisma.region.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No regions found");
    }
    return { alldata };
  }

  @ApiOperation({ summary: 'Get a region by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Region ID' })
  @ApiResponse({ status: 200, description: 'The region with the given ID.' })
  @ApiResponse({ status: 400, description: 'Region not found.' })
  async findOne(id: string) {
    let isRegionExists = await this.prisma.region.findFirst({ where: { id } });
    if (!isRegionExists) {
      throw new BadRequestException("Region not found");
    }
    return { Region: isRegionExists };
  }

  @ApiOperation({ summary: 'Update a region by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Region ID' })
  @ApiBody({ type: UpdateRegionDto }) 
  @ApiResponse({ status: 200, description: 'The region has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Region not found.' })
  async update(id: string, updateRegionDto: UpdateRegionDto) {
    let isRegionExists = await this.prisma.region.findFirst({ where: { id } });
    if (!isRegionExists) {
      throw new BadRequestException("Region not found");
    }
    let updatedRegion = await this.prisma.region.update({
      where: { id },
      data: { ...updateRegionDto },
    });
    return { Updated: updatedRegion };
  }

  @ApiOperation({ summary: 'Delete a region by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Region ID' })
  @ApiResponse({ status: 200, description: 'The region has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Region not found.' })
  async remove(id: string) {
    let isRegionExists = await this.prisma.region.findFirst({ where: { id } });
    if (!isRegionExists) {
      throw new BadRequestException("Region not found");
    }
    let deletedRegion = await this.prisma.region.delete({ where: { id } });
    return { Deleted: deletedRegion };
  }
}
