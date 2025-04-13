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
    let created = await this.prisma.product.create({data:{...createProductDto}});
    return {created}
  }

  async findAll() {
    let alldata = await this.prisma.product.findMany();
    if (!alldata.length) {
      throw new BadGatewayException("No products found");
    }
    return { alldata };
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
