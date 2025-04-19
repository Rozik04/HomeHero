import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateOtp } from 'src/utils/util.functions';
import { promises as fs } from 'fs';
import * as path from 'path';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma';

@ApiTags('tools')
@Injectable()
export class ToolService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new tool' })
  @ApiBody({ type: CreateToolDto })
  @ApiResponse({ status: 201, description: 'The tool has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createToolDto: CreateToolDto) {
    let toolCode = generateOtp();
    let created = await this.prisma.tool.create({ data: { ...createToolDto, code: toolCode } });
    return  created ;
  }

  @ApiOperation({ summary: 'Get all tools' })
  async findAll(query: any) {
    const {
      search,
      sortBy = 'nameEn',
      order = 'asc',
      page = 1,
      limit = 10,
    } = query;

    const where: Prisma.ToolWhereInput = search
      ? {
          OR: [
            {
              nameRu: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
            {
              nameUz: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
            {
              nameEn: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.tool.findMany({
        where,
        include: {
          size: { select: { nameEn: true, nameRu: true, nameUz: true } },
          brand: { select: { nameEn: true, nameRu: true, nameUz: true } },
          capacity: { select: { nameEn: true, nameRu: true, nameUz: true } },
        },
        orderBy: { [sortBy]: order },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      this.prisma.tool.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        lastPage: Math.ceil(total / Number(limit)),
      },
    };
  }

  @ApiOperation({ summary: 'Get a tool by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Tool ID' })
  @ApiResponse({ status: 200, description: 'The tool with the given ID.' })
  @ApiResponse({ status: 400, description: 'Tool not found.' })
  async findOne(id: string) {
    let isToolExists = await this.prisma.tool.findFirst({
      where: { id },
      include: {
        size: { select: { nameEn: true, nameRu: true, nameUz: true } },
        brand: { select: { nameEn: true, nameRu: true, nameUz: true } },
        capacity: { select: { nameEn: true, nameRu: true, nameUz: true } },
      },
    });
    if (!isToolExists) {
      throw new BadRequestException('Tool not found');
    }
    return  isToolExists ;
  }

  @ApiOperation({ summary: 'Update a tool by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Tool ID' })
  @ApiBody({ type: UpdateToolDto })
  @ApiResponse({ status: 200, description: 'The tool has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Tool not found.' })
  async update(id: string, updateToolDto: UpdateToolDto) {
    let isToolExists = await this.prisma.tool.findFirst({ where: { id } });
    if (!isToolExists) {
      throw new BadRequestException('Tool not found');
    }
    let basket = await this.prisma.basket.findMany({where:{toolID:id}});
    if(isToolExists.dailyPrice||isToolExists.hourlyPrice&&basket){
      await this.prisma.basket.deleteMany({where:{toolID:id}});
    }
    let updated = await this.prisma.tool.update({ where: { id }, data: { ...updateToolDto } });
    return  updated ;
  }

  @ApiOperation({ summary: 'Delete a tool by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Tool ID' })
  @ApiResponse({ status: 200, description: 'The tool has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Tool not found.' })
  async remove(id: string) {
    let isToolExists = await this.prisma.tool.findFirst({ where: { id } });
    if (!isToolExists) {
      throw new BadRequestException('Tool not found');
    }
    if (isToolExists.image) {
      let filePath = path.join(__dirname, '../../uploadTools', isToolExists.image);
      fs.unlink(filePath);
    }
    let deleted = await this.prisma.tool.delete({ where: { id } });
    return  deleted ;
  }


  async updateImage(id: string, image: Express.Multer.File) {
    let isToolExists = await this.prisma.tool.findFirst({ where: { id } });
    if (!isToolExists) {
      throw new BadRequestException('Tool not found');
    }
    const oldImage = isToolExists.image;
    if (oldImage) {
      let filePath = path.join(__dirname, '../../uploadTools', oldImage);
      fs.unlink(filePath);
      return { Updated: image.filename };
    }
  }
}
