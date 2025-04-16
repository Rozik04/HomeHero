import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('capacities')
@Injectable()
export class CapacityService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new capacity' })
  @ApiBody({ type: CreateCapacityDto })
  @ApiResponse({ status: 201, description: 'The capacity has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createCapacityDto: CreateCapacityDto) {
    let data = await this.prisma.capacity.create({ data: { ...createCapacityDto } });
    return { data };
  }

  @ApiOperation({ summary: 'Get all capacities' })
  @ApiResponse({ status: 200, description: 'List of all capacities.' })
  @ApiResponse({ status: 400, description: 'No capacities found.' })
  async findAll() {
    let alldata = await this.prisma.capacity.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No capacities found");
    }
    return { alldata };
  }

  @ApiOperation({ summary: 'Get a capacity by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Capacity ID' })
  @ApiResponse({ status: 200, description: 'The capacity with the given ID.' })
  @ApiResponse({ status: 400, description: 'Capacity not found.' })
  async findOne(id: string) {
    let isCapacityExists = await this.prisma.capacity.findFirst({ where: { id } });
    if (!isCapacityExists) {
      throw new BadRequestException("Capacity not found");
    }
    return { Capacity: isCapacityExists };
  }

  @ApiOperation({ summary: 'Update a capacity by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Capacity ID' })
  @ApiBody({ type: UpdateCapacityDto }) 
  @ApiResponse({ status: 200, description: 'The capacity has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Capacity not found.' })
  async update(id: string, updateCapacityDto: UpdateCapacityDto) {
    let isCapacityExists = await this.prisma.capacity.findFirst({ where: { id } });
    if (!isCapacityExists) {
      throw new BadRequestException("Capacity not found");
    }
    let updatedCapacity = await this.prisma.capacity.update({
      where: { id },
      data: { ...updateCapacityDto },
    });
    return { Updated: updatedCapacity };
  }

  @ApiOperation({ summary: 'Delete a capacity by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Capacity ID' })
  @ApiResponse({ status: 200, description: 'The capacity has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Capacity not found.' })
  async remove(id: string) {
    let isCapacityExists = await this.prisma.capacity.findFirst({ where: { id } });
    if (!isCapacityExists) {
      throw new BadRequestException("Capacity not found");
    }
    let deletedCapacity = await this.prisma.capacity.delete({ where: { id } });
    return { Deleted: deletedCapacity };
  }
}
