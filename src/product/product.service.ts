import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { promises as fs } from 'fs';
import * as path from 'path';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma';

@ApiTags('products')
@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(dto: CreateProductDto) {
    const {
      nameRu,
      nameUz,
      nameEn,
      image,
      isActive,
      levelIDs,
      toolIDs,
      workingHours,
      hourlyPrice,
      dailyPrice,
    } = dto;

    const product = await this.prisma.product.create({
      data: {
        nameRu,
        nameUz,
        nameEn,
        image,
        isActive,
      },
    });

    const productID = product.id;

    await Promise.all(
      levelIDs.map((levelID) =>
        this.prisma.productLevel.create({
          data: {
            productID,
            levelID,
            workingHours,
            hourlyPrice,
            dailyPrice,
          },
        }),
      ),
    );

    await Promise.all(
      toolIDs.map((toolID) =>
        this.prisma.productTool.create({
          data: {
            productID,
            toolID,
          },
        }),
      ),
    );

    return product
    
  }

  async findAll(query: any) {
    const {
      search,
      sortBy = 'nameRu',
      order = 'asc',
      page = 1,
      limit = 10,
    } = query;

    const skip = (Number(page) - 1) * Number(limit);

    const where: Prisma.ProductWhereInput = search
      ? {
          OR: [
            {
              nameRu: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              nameUz: {
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

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          levels: {
            include: {
              level: true,
            },
          },
          tools: {
            include: {
              tool: true,
            },
          },
        },
        orderBy: { [sortBy]: order },
        skip,
        take: Number(limit),
      }),
      this.prisma.product.count({ where }),
    ]);

    const mapped = products.map((product) => ({
      id: product.id,
      nameRu: product.nameRu,
      nameUz: product.nameUz,
      nameEn: product.nameEn,
      image: product.image,
      isActive: product.isActive,
      levels: product.levels.map((item) => ({
        id: item.level.id,
        nameRu: item.level.nameRu,
        nameUz: item.level.nameUz,
        nameEn: item.level.nameEn,
        dailyPrice: item.dailyPrice,
        workingHours: item.workingHours,
        hourlyPrice: item.hourlyPrice,
      })),
      tools: product.tools.map((item) => ({
        id: item.tool.id,
        nameRu: item.tool.nameRu,
        nameUz: item.tool.nameUz,
        nameEn: item.tool.nameEn,
        descriptionRu: item.tool.descriptionRu,
        descriptionUz: item.tool.descriptionUz,
        descriptionEn: item.tool.descriptionEn,
        price: item.tool.price,
        quantity: item.tool.quantity,
        image: item.tool.image,
      })),
    }));

    return {
      data: mapped,
      meta: {
        total,
        page: Number(page),
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'The product with the given ID.' })
  @ApiResponse({ status: 400, description: 'Product not found.' })
  async findOne(id: string) {
    let isProducExists = await this.prisma.product.findFirst({ where: { id } });
    if (!isProducExists) {
      throw new BadRequestException("Product not found");
    }
    return { product: isProducExists };
  }

  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Product not found.' })
  async update(id: string, updateProductDto: UpdateProductDto) {
    let isProductExists = await this.prisma.product.findFirst({ where: { id } });
    if (!isProductExists) {
      throw new BadRequestException("Product not found");
    }
    let updatedProduct = await this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
    return { Updated: updatedProduct };
  }

  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Product not found.' })
  async remove(id: string) {
    let isProductExists = await this.prisma.product.findFirst({ where: { id } });
    if (!isProductExists) {
      throw new BadRequestException("Product not found");
    }
    if (isProductExists.image) {
      let filepath = path.join(__dirname, "../../uploadProducts", isProductExists.image);
      fs.unlink(filepath);
    }
    let deletedProduct = await this.prisma.product.delete({ where: { id } });
    return { Deleted: deletedProduct };
  }

  async updateImage(id: string, image: Express.Multer.File) {
    let isProducExists = await this.prisma.product.findFirst({ where: { id } });
    if (!isProducExists) {
      throw new BadRequestException("Product not found");
    }
    let oldImage = isProducExists.image;
    let filePath = path.join(__dirname, "../../uploadProducts", oldImage);
    fs.unlink(filePath);
    return { "Updated image": image.filename };
  }
}
