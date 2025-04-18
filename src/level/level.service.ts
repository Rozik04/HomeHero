import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma';

@ApiTags('levels')
@Injectable()
export class LevelService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new level' })
  @ApiBody({ type: CreateLevelDto })
  @ApiResponse({ status: 201, description: 'The level has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createLevelDto: CreateLevelDto) {
    let data = await this.prisma.level.create({ data: { ...createLevelDto } });
    return data;
  }

  async findAll(query: any) {
    const {
      search = '',
      sortBy = 'nameUz',
      order = 'asc',
      page = 1,
      limit = 10,
    } = query;

    const where: Prisma.LevelWhereInput = search
      ? {
          OR: [
            {
              nameUz: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              nameRu: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              nameEn: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.level.findMany({
        where,
        orderBy: {
          [sortBy]: order,
        },
        skip: (page - 1) * limit,
        take: Number(limit),
      }),
      this.prisma.level.count({ where }),
    ]);


    return {
      data,
      meta: {
        total,
        page: Number(page),
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  @ApiOperation({ summary: 'Get a level by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Level ID' })
  @ApiResponse({ status: 200, description: 'The level with the given ID.' })
  @ApiResponse({ status: 400, description: 'Level not found.' })
  async findOne(id: string) {
    let isLevelExists = await this.prisma.level.findFirst({ where: { id } });
    if (!isLevelExists) {
      throw new BadRequestException("Level not found");
    }
    return  isLevelExists ;
  }

  @ApiOperation({ summary: 'Update a level by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Level ID' })
  @ApiBody({ type: UpdateLevelDto }) 
  @ApiResponse({ status: 200, description: 'The level has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Level not found.' })
  async update(id: string, updateLevelDto: UpdateLevelDto) {
    let isLevelExists = await this.prisma.level.findFirst({ where: { id } });
    if (!isLevelExists) {
      throw new BadRequestException("Level not found");
    }
    let updatedLevel = await this.prisma.level.update({
      where: { id },
      data: { ...updateLevelDto },
    });
    return updatedLevel ;
  }

  @ApiOperation({ summary: 'Delete a level by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Level ID' })
  @ApiResponse({ status: 200, description: 'The level has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Level not found.' })
  async remove(id: string) {
    let isLevelExists = await this.prisma.level.findFirst({ where: { id } });
    if (!isLevelExists) {
      throw new BadRequestException("Level not found");
    }
    let deletedLevel = await this.prisma.level.delete({ where: { id } });
    return  deletedLevel ;
  }
}
