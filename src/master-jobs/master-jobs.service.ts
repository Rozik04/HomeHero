import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateMasterJobDto } from './dto/create-master-job.dto';
import { UpdateMasterJobDto } from './dto/update-master-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('master-jobs')
@Injectable()
export class MasterJobsService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new master job' })
  @ApiBody({ type: CreateMasterJobDto })
  @ApiResponse({ status: 201, description: 'Master job successfully created.' })
  @ApiResponse({ status: 400, description: 'Master job was not created.' })
  async create(createMasterJobDto: CreateMasterJobDto) {
    let checkLevel = await this.prisma.product.findFirst({
      where: {
        id: createMasterJobDto.productID,
        levels: { some: { levelID: createMasterJobDto.levelID } },
      },
    });
    if (!checkLevel) {
      throw new BadRequestException('This level is not linked to this product.');
    }

    let checkTool = await this.prisma.product.findFirst({
      where: {
        id: createMasterJobDto.productID,
        tools: { some: { toolID: createMasterJobDto.toolID } },
      },
    });
    if (!checkTool) {
      throw new BadRequestException('This tool is not linked to this product.');
    }

    let created = await this.prisma.masterJobs.create({
      data: { ...createMasterJobDto },
    });
    return created ;
  }

  @ApiOperation({ summary: 'Get all master jobs' })
  @ApiResponse({ status: 200, description: 'List of all master jobs.' })
  @ApiResponse({ status: 400, description: 'No master jobs found.' })
  async findAll() {
    let allMasterJobs = await this.prisma.masterJobs.findMany({
      include: {
        level: { select: { nameEn: true, nameRu: true, nameUz: true } },
        product: { select: { nameEn: true, nameRu: true, nameUz: true } },
        master: { select: { nameUz: true, phone: true, isActive: true } },
      },
    });

    return  allMasterJobs ;
  }

  @ApiOperation({ summary: 'Get a master job by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Master job ID' })
  @ApiResponse({ status: 200, description: 'Master job found.' })
  @ApiResponse({ status: 400, description: 'Job not found.' })
  async findOne(id: string) {
    let isJobExists = await this.prisma.masterJobs.findFirst({ where: { id } });
    if (!isJobExists) {
      throw new BadRequestException('Job not found');
    }
    return { found: isJobExists };
  }

  @ApiOperation({ summary: 'Update a master job by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Master job ID' })
  @ApiBody({ type: UpdateMasterJobDto })
  @ApiResponse({ status: 200, description: 'Master job successfully updated.' })
  @ApiResponse({ status: 400, description: 'Job not found.' })
  async update(id: string, updateMasterJobDto: UpdateMasterJobDto) {
    let isJobExists = await this.prisma.masterJobs.findFirst({ where: { id } });
    if (!isJobExists) {
      throw new BadRequestException('Job not found');
    }


    let checkLevel = await this.prisma.product.findFirst({
      where: {
        id: updateMasterJobDto.productID,
        levels: { some: { levelID: updateMasterJobDto.levelID } },
      },
    });
    if (!checkLevel) {
      throw new BadRequestException('This level is not linked to this product.');
    }

    let checkTool = await this.prisma.product.findFirst({
      where: {
        id: updateMasterJobDto.productID,
        tools: { some: { toolID: updateMasterJobDto.toolID } },
      },
    });
    if (!checkTool) {
      throw new BadRequestException('This tool is not linked to this product.');
    }

    let updated = await this.prisma.masterJobs.update({
      where: { id },
      data: { ...updateMasterJobDto },
    });
    return { updated };
  }

  @ApiOperation({ summary: 'Delete a master job by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Master job ID' })
  @ApiResponse({ status: 200, description: 'Master job successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Job not found.' })
  async remove(id: string) {
    let isJobExists = await this.prisma.masterJobs.findFirst({ where: { id } });
    if (!isJobExists) {
      throw new BadRequestException('Job not found');
    }

    let deleted = await this.prisma.masterJobs.delete({ where: { id } });
    return { deleted };
  }
}
