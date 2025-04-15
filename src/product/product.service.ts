import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {promises as fs} from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {
 constructor(private readonly prisma:PrismaService){}

  async create(createProductDto: CreateProductDto) {
  const { nameRu, nameUz, nameEn, image, isActive, levelIDs, toolIDs, minWorkingHours, dailyPrice, hourlyPrice } = createProductDto;
  const product = await this.prisma.product.create({
    data: {
      nameRu,
      nameUz,
      nameEn,
      image,
      isActive,
      minWorkingHours,
      dailyPrice,
      hourlyPrice
    },
  });

  if (levelIDs && levelIDs.length > 0) {
    await this.prisma.productLevel.createMany({
      data: levelIDs.map((levelID) => ({
        productID: product.id,
        levelID,
      })),
      skipDuplicates: true,
    });
  }

  if (toolIDs && toolIDs.length > 0) {
    await this.prisma.productTool.createMany({
      data: toolIDs.map((toolID) => ({
        productID: product.id,
        toolID,
      })),
      skipDuplicates: true,
    });
  }

  return product;
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
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
    });
  
    return products.map((product) => ({
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
  }
  
  async findOne(id: string) {
    let isProducExists = await this.prisma.product.findFirst({ where: { id } });
    if (!isProducExists) {
      throw new BadRequestException("product not found");
    }
    return { product: isProducExists };
  }

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

  async remove(id: string) {
    let isProductExists = await this.prisma.product.findFirst({ where: { id } });
    if (!isProductExists) {
      throw new BadRequestException("Product not found");
    }
    if(isProductExists.image){
      let filepath = path.join(__dirname,"../../uploadProducts", isProductExists.image);
      fs.unlink(filepath);
    }
    let deletedProduct = await this.prisma.product.delete({ where: { id } });
    return { Deleted: deletedProduct };
  }

  async updateImage(id: string, image:Express.Multer.File){
    let isProducExists = await this.prisma.product.findFirst({where:{id}});
    if(!isProducExists){
      throw new BadRequestException("Not product found");
    }
    let oldImage = isProducExists.image;
    let filePath = path.join(__dirname,"../../uploadProducts",oldImage)
    fs.unlink(filePath);
    return {"Updated image": image.filename}
  }
}
