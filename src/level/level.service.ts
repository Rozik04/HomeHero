import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    return { data };
  }

  @ApiOperation({ summary: 'Get all levels' })
  @ApiResponse({ status: 200, description: 'List of all levels.' })
  @ApiResponse({ status: 400, description: 'No levels found.' })
  async findAll() {
    let alldata = await this.prisma.level.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No levels found");
    }
    return { alldata };
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
    return { Level: isLevelExists };
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
    return { Updated: updatedLevel };
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
    return { Deleted: deletedLevel };
  }
}
