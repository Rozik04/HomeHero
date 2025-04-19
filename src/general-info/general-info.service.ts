import { BadRequestException,Injectable,} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody,} from '@nestjs/swagger';
import { CreateGeneralInfoDto } from './dto/create-general-info.dto';
import { UpdateGeneralInfoDto } from './dto/update-general-info.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('General Info')
@Injectable()
export class GeneralInfoService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new General Info' })
  @ApiBody({ type: CreateGeneralInfoDto })
  @ApiResponse({ status: 201, description: 'General info successfully created.' })
  @ApiResponse({ status: 400, description: 'General info was not created.' })
  async create(createGeneralInfoDto: CreateGeneralInfoDto) {
    let data = await this.prisma.generalInfo.create({ data: { ...createGeneralInfoDto } });
    return  data;
  }

  @ApiOperation({ summary: 'Get all General Info records' })
  @ApiResponse({ status: 200, description: 'List of all general info records.' })
  @ApiResponse({ status: 400, description: 'No general info found.' })
  async findAll() {
    let alldata = await this.prisma.generalInfo.findMany();
    return  alldata ;
  }

  @ApiOperation({ summary: 'Get a General Info by ID' })
  @ApiParam({ name: 'id', type: String, description: 'General info ID' })
  @ApiResponse({ status: 200, description: 'General info found.' })
  @ApiResponse({ status: 400, description: 'General info not found.' })
  async findOne(id: string) {
    let isGeneralInfoExists = await this.prisma.generalInfo.findFirst({ where: { id } });
    if (!isGeneralInfoExists) {
      throw new BadRequestException('General info not found');
    }
    return isGeneralInfoExists;
  }

  @ApiOperation({ summary: 'Update a General Info by ID' })
  @ApiParam({ name: 'id', type: String, description: 'General info ID' })
  @ApiBody({ type: UpdateGeneralInfoDto })
  @ApiResponse({ status: 200, description: 'General info successfully updated.' })
  @ApiResponse({ status: 400, description: 'General info not found.' })
  async update(id: string, updateGeneralInfoDto: UpdateGeneralInfoDto) {
    let isGeneralInfoExists = await this.prisma.generalInfo.findFirst({ where: { id } });
    if (!isGeneralInfoExists) {
      throw new BadRequestException('General info not found');
    }
    let updatedGeneralInfo = await this.prisma.generalInfo.update({
      where: { id },
      data: { ...updateGeneralInfoDto },
    });
    return updatedGeneralInfo;
  }

  @ApiOperation({ summary: 'Delete a General Info by ID' })
  @ApiParam({ name: 'id', type: String, description: 'General info ID' })
  @ApiResponse({ status: 200, description: 'General info successfully deleted.' })
  @ApiResponse({ status: 400, description: 'General info not found.' })
  async remove(id: string) {
    let isGeneralInfoExists = await this.prisma.generalInfo.findFirst({ where: { id } });
    if (!isGeneralInfoExists) {
      throw new BadRequestException('General info not found');
    }
    let deletedGeneralInfo = await this.prisma.generalInfo.delete({ where: { id } });
    return deletedGeneralInfo;
  }
}
