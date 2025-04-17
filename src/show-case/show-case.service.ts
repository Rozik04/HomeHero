import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShowCaseDto } from './dto/create-show-case.dto';
import { UpdateShowCaseDto } from './dto/update-show-case.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { promises as fs } from 'fs';
import * as path from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('showcases')
@Injectable()
export class ShowCaseService {
  constructor(private prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new showcase' })
  @ApiBody({ type: CreateShowCaseDto })
  @ApiResponse({ status: 201, description: 'The showcase has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createShowCaseDto: CreateShowCaseDto) {
    const created = await this.prisma.showCase.create({
      data: { ...createShowCaseDto },
    });
    return { created };
  }

  @ApiOperation({ summary: 'Get all showcases' })
  @ApiResponse({ status: 200, description: 'List of all showcases.' })
  @ApiResponse({ status: 400, description: 'No showcases found.' })
  async findAll() {
    const allShowCases = await this.prisma.showCase.findMany();

    return  allShowCases ;
  }

  @ApiOperation({ summary: 'Get a showcase by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ShowCase ID' })
  @ApiResponse({ status: 200, description: 'The showcase with the given ID.' })
  @ApiResponse({ status: 400, description: 'ShowCase not found.' })
  async findOne(id: string) {
    const isShowCaseExists = await this.prisma.showCase.findFirst({
      where: { id },
    });
    if (!isShowCaseExists) {
      throw new BadRequestException('ShowCase not found');
    }
    return { found: isShowCaseExists };
  }

  @ApiOperation({ summary: 'Update a showcase by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ShowCase ID' })
  @ApiBody({ type: UpdateShowCaseDto })
  @ApiResponse({ status: 200, description: 'The showcase has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'ShowCase not found.' })
  async update(id: string, updateShowCaseDto: UpdateShowCaseDto) {
    const isShowCaseExists = await this.prisma.showCase.findFirst({
      where: { id },
    });
    if (!isShowCaseExists) {
      throw new BadRequestException('ShowCase not found');
    }
    const updated = await this.prisma.showCase.update({
      where: { id },
      data: { ...updateShowCaseDto },
    });
    return { updated };
  }

  @ApiOperation({ summary: 'Delete a showcase by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ShowCase ID' })
  @ApiResponse({ status: 200, description: 'The showcase has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'ShowCase not found.' })
  async remove(id: string) {
    const isShowCaseExists = await this.prisma.showCase.findFirst({
      where: { id },
    });
    if (!isShowCaseExists) {
      throw new BadRequestException('ShowCase not found');
    }

    if (isShowCaseExists.image) {
      const filepath = path.join(__dirname, '../../uploadShowCases', isShowCaseExists.image);
      fs.unlink(filepath);
    }

    const deleted = await this.prisma.showCase.delete({
      where: { id },
    });
    return { deleted };
  }

  @ApiOperation({ summary: 'Update image of a showcase' })
  @ApiParam({ name: 'id', type: String, description: 'ShowCase ID' })
  @ApiResponse({ status: 200, description: 'ShowCase image has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'ShowCase not found.' })
  async updateImage(id: string, image: Express.Multer.File) {
    const isShowCaseExists = await this.prisma.showCase.findFirst({
      where: { id },
    });
    if (!isShowCaseExists) {
      throw new BadRequestException('ShowCase not found');
    }

    const oldImage = isShowCaseExists.image;
    const filePath = path.join(__dirname, '../../uploadShowCases', oldImage);
    fs.unlink(filePath);

    return { 'Updated image': image.filename };
  }
}
