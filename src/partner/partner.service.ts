import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
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
import { Prisma } from 'generated/prisma';

@ApiTags('partners')
@Injectable()
export class PartnerService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new partner' })
  @ApiBody({ type: CreatePartnerDto })
  @ApiResponse({ status: 201, description: 'The partner has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createPartnerDto: CreatePartnerDto) {
    let data = await this.prisma.partner.create({ data: { ...createPartnerDto, agreementStart:new Date(), agreementEnd:new Date(createPartnerDto.agreementEnd) } });
    return { data };
  }


  async findAll(query: any) {
    const { search, sortBy = 'nameRu', order = 'asc', page = 1, limit = 10 } = query;

    const where: Prisma.PartnerWhereInput = search
      ? {
          OR: [
            { nameRu: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { nameUz: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { nameEn: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {};

    const [alldata, total] = await this.prisma.$transaction([
      this.prisma.partner.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      this.prisma.partner.count({ where }),
    ]);

    if (!alldata.length) {
      throw new BadRequestException('No partners found');
    }

    return {
      data: alldata,
      meta: {
        total,
        page: Number(page),
        lastPage: Math.ceil(total / Number(limit)),
      },
    };
  }

  @ApiOperation({ summary: 'Get a partner by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Partner ID' })
  @ApiResponse({ status: 200, description: 'The partner with the given ID.' })
  @ApiResponse({ status: 400, description: 'Partner not found.' })
  async findOne(id: string) {
    let isPartnerExists = await this.prisma.partner.findFirst({ where: { id } });
    if (!isPartnerExists) {
      throw new BadRequestException("Partner not found");
    }
    return { Partner: isPartnerExists };
  }

  @ApiOperation({ summary: 'Update a partner by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Partner ID' })
  @ApiBody({ type: UpdatePartnerDto })
  @ApiResponse({ status: 200, description: 'The partner has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Partner not found.' })
  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    let isPartnerExists = await this.prisma.partner.findFirst({ where: { id } });
    if (!isPartnerExists) {
      throw new BadRequestException("Partner not found");
    }
    let updatedPartner = await this.prisma.partner.update({
      where: { id },
      data: { ...updatePartnerDto, agreementStart:new Date()},
    });
    return { Updated: updatedPartner };
  }

  @ApiOperation({ summary: 'Delete a partner by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Partner ID' })
  @ApiResponse({ status: 200, description: 'The partner has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Partner not found.' })
  async remove(id: string) {
    let isPartnerExists = await this.prisma.partner.findFirst({ where: { id } });
    if (!isPartnerExists) {
      throw new BadRequestException("Partner not found");
    }
    if (isPartnerExists.image) {
      let filepath = path.join(__dirname, "../../uploadPartners", isPartnerExists.image);
      fs.unlink(filepath);
    }
    let deletedPartner = await this.prisma.partner.delete({ where: { id } });
    return { Deleted: deletedPartner };
  }

  @ApiOperation({ summary: 'Update image of a partner' })
  @ApiParam({ name: 'id', type: String, description: 'Partner ID' })
  @ApiResponse({ status: 200, description: 'Partner image has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Partner not found.' })
  async updateImage(id: string, image: Express.Multer.File) {
    let isPartnerExists = await this.prisma.partner.findFirst({ where: { id } });
    if (!isPartnerExists) {
      throw new BadRequestException("Not Partner found");
    }
    let oldImage = isPartnerExists.image;
    let filePath = path.join(__dirname, "../../uploadPartners", oldImage);
    fs.unlink(filePath);
    return { "Updated image": image.filename };
  }
}
