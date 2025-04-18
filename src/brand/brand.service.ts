import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma';

@ApiTags('brands')
@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new brand' })
  @ApiBody({ type: CreateBrandDto })
  @ApiResponse({ status: 201, description: 'The brand has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createBrandDto: CreateBrandDto) {
    let data = await this.prisma.brand.create({ data: { ...createBrandDto } });
    return  data ;
  }


  async findAll(query: any) {
    const {
      search,
      sortBy = 'nameUz',
      order = 'asc',
      page = 1,
      limit = 10,
    } = query;

    const where: Prisma.BrandWhereInput = search
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

      const skip = (page - 1) * limit;

      const [alldata, total] = await Promise.all([
        this.prisma.brand.findMany({
          where,
          orderBy: { [sortBy]: order },
          skip: Number(skip),
          take: Number(limit),
        }),
        this.prisma.brand.count({ where }),
      ]);
  
      return {
        data: alldata,
        meta: {
          total,
          page: Number(page),
          lastPage: Math.ceil(total / limit),
        },
      };
  }


  @ApiOperation({ summary: 'Get a brand by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'The brand with the given ID.' })
  @ApiResponse({ status: 400, description: 'brand not found.' })
  async findOne(id: string) {
    let isbrandExists = await this.prisma.brand.findFirst({ where: { id } });
    if (!isbrandExists) {
      throw new BadRequestException("brand not found");
    }
    return { brand: isbrandExists };
  }


  @ApiOperation({ summary: 'Update a brand by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Brand ID' })
  @ApiBody({ type: UpdateBrandDto }) 
  @ApiResponse({ status: 200, description: 'The brand has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Brand not found.' })
  async update(id: string, updateBrandDto: UpdateBrandDto) {
    let isBrandExists = await this.prisma.brand.findFirst({ where: { id } });
    if (!isBrandExists) {
      throw new BadRequestException("Brand not found");
    }
    let updatedBrand = await this.prisma.brand.update({
      where: { id },
      data: { ...updateBrandDto },
    });
    return updatedBrand ;
  }

  @ApiOperation({ summary: 'Delete a brand by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Brand ID' })
  @ApiResponse({ status: 200, description: 'The brand has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Brand not found.' })
  async remove(id: string) {
    let isBrandExists = await this.prisma.brand.findFirst({ where: { id } });
    if (!isBrandExists) {
      throw new BadRequestException("Brand not found");
    }
    let deletedBrand = await this.prisma.brand.delete({ where: { id } });
    return deletedBrand ;
  }
}
