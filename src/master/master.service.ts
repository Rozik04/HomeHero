import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { promises as fs } from "fs";
import * as path from 'path';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma';

@ApiTags('masters')
@Injectable()
export class MasterService {
  constructor(private prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new master' })
  @ApiBody({ type: CreateMasterDto })
  @ApiResponse({ status: 201, description: 'Master successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createMasterDto: CreateMasterDto) {
    let created = await this.prisma.master.create({ data: { ...createMasterDto } });
    return  created ;
  }

  @ApiOperation({ summary: 'Get all masters' })
  @ApiResponse({ status: 200, description: 'List of all masters.' })
  @ApiResponse({ status: 400, description: 'No masters found.' })
  async findAll(query: any) {
    const {
      search,
      sortBy = 'nameUz',
      order = 'asc',
      page = 1,
      limit = 10,
    } = query;

    const where: Prisma.MasterWhereInput = search
      ? {
          OR: [
            { nameUz: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { nameRu: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { nameEn: {contains: search, mode: Prisma.QueryMode.insensitive   }}
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.master.findMany({
        where,
        orderBy: {
          [sortBy]: order,
        },
        skip: (page - 1) * limit,
        take: +limit,
      }),
      this.prisma.master.count({ where }),
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

  @ApiOperation({ summary: 'Get a master by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Master ID' })
  @ApiResponse({ status: 200, description: 'Master found.' })
  @ApiResponse({ status: 400, description: 'Master not found.' })
  async findOne(id: string) {
    let isMasterExists = await this.prisma.master.findFirst({ where: { id } });
    if (!isMasterExists) {
      throw new BadRequestException("Master not found");
    }
    return { found: isMasterExists };
  }

  @ApiOperation({ summary: 'Update a master by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Master ID' })
  @ApiBody({ type: UpdateMasterDto })
  @ApiResponse({ status: 200, description: 'Master successfully updated.' })
  @ApiResponse({ status: 400, description: 'Master not found.' })
  async update(id: string, updateMasterDto: UpdateMasterDto) {
    let isMasterExists = await this.prisma.master.findFirst({ where: { id } });
    if (!isMasterExists) {
      throw new BadRequestException("Master not found");
    }
    let updated = await this.prisma.master.update({ where: { id }, data: { ...updateMasterDto } });
    return updated ;
  }

  @ApiOperation({ summary: 'Delete a master by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Master ID' })
  @ApiResponse({ status: 200, description: 'Master successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Master not found.' })
  async remove(id: string) {
    let isMasterExists = await this.prisma.master.findFirst({ where: { id } });
    if (!isMasterExists) {
      throw new BadRequestException("Master not found");
    }
    if (isMasterExists.image && isMasterExists.passportImage) {
      let filepath = path.join(__dirname, "../../uploadMasters", isMasterExists.image);
      let filepath2 = path.join(__dirname, "../../uploadPassports", isMasterExists.passportImage);
      fs.unlink(filepath);
      fs.unlink(filepath2);
    }
    let deletedMaster = await this.prisma.master.delete({ where: { id } });
    return  deletedMaster;
  }

  @ApiOperation({ summary: 'Update master profile image' })
  @ApiParam({ name: 'id', type: String, description: 'Master ID' })
  @ApiResponse({ status: 200, description: 'Profile image updated successfully.' })
  @ApiResponse({ status: 400, description: 'Master not found.' })
  async updateImage(id: string, image: Express.Multer.File) {
    let isMasterExists = await this.prisma.master.findFirst({ where: { id } });
    if (!isMasterExists) {
      throw new BadRequestException("Not Master found");
    }
    let oldImage = isMasterExists.image;
    let filePath = path.join(__dirname, "../../uploadMasters", oldImage);
    fs.unlink(filePath);
    return { "Updated image": image.filename };
  }

  @ApiOperation({ summary: 'Update master passport image' })
  @ApiParam({ name: 'id', type: String, description: 'Master ID' })
  @ApiResponse({ status: 200, description: 'Passport image updated successfully.' })
  @ApiResponse({ status: 400, description: 'Master not found.' })
  async updatePassportImage(id: string, image: Express.Multer.File) {
    let isMasterExists = await this.prisma.master.findFirst({ where: { id } });
    if (!isMasterExists) {
      throw new BadRequestException("Not Master found");
    }
    let oldImage = isMasterExists.passportImage;
    let filePath = path.join(__dirname, "../../uploadPassports", oldImage);
    fs.unlink(filePath);
    return { "Updated image": image.filename };
  }
}
