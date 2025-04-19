import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma';

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
    return  data ;
  }

  
  async findAll(query: any) {
    const {
      search = '',
      sortBy = 'nameUz',
      order = 'asc',
      page = 1,
      limit = 10,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.CapacityWhereInput = search
      ? {
          OR: [
            { nameUz: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { nameRu: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { nameEn: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.capacity.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: +skip,
        take: +limit,
      }),
      this.prisma.capacity.count({ where }),
    ]);



    return {
      data,
      meta: {
        total,
        page: +page,
        lastPage: Math.ceil(total / limit),
      },
    };
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
    return  isCapacityExists ;
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
    return  updatedCapacity ;
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
    return  deletedCapacity ;
  }
}
