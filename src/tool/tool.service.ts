import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateOtp } from 'src/utils/util.functions';
import {promises as fs} from "fs";
import * as path from "path";

@Injectable()
export class ToolService {
  constructor(private readonly prisma : PrismaService){}

  async create(createToolDto: CreateToolDto) {
    let toolCode = generateOtp()
    let created = await this.prisma.tool.create({data:{...createToolDto, code:toolCode}})
    return {created};
  }

  async findAll() {
    let allTools = await this.prisma.tool.findMany({include:{
      size:{select:{nameEn:true,nameRu:true,nameUz:true}},
      brand:{select:{nameEn:true,nameRu:true,nameUz:true}},
      capacity:{select:{nameEn:true,nameRu:true,nameUz:true}}, 
      level:{select:{nameEn:true,nameRu:true,nameUz:true}}
    }});
    if(!allTools.length){
      throw new BadRequestException("Not found tools")
    }
    return {allTools};
  }

  async findOne(id: string) {
    let isToolExists = await this.prisma.tool.findFirst({where:{id},include:{
      size:{select:{nameEn:true,nameRu:true,nameUz:true}},
      brand:{select:{nameEn:true,nameRu:true,nameUz:true}},
      capacity:{select:{nameEn:true,nameRu:true,nameUz:true}},
      level:{select:{nameEn:true,nameRu:true,nameUz:true}}
    }});
    if(!isToolExists){
      throw new BadRequestException("Tool not found")
    }
    return {found:isToolExists};
  }

  async update(id: string, updateToolDto: UpdateToolDto) {
   let isToolExists = await this.prisma.tool.findFirst({where:{id}});
   if(!isToolExists){
    throw new BadRequestException("Tool not found")
   }
   let updated = await this.prisma.tool.update({where:{id},data:{...updateToolDto}});
    return {updated}
  }

  async remove(id: string) {
    let isToolExists = await this.prisma.tool.findFirst({where:{id}});
    if(!isToolExists){
      throw new BadRequestException("Tool not found")
     }
    if(isToolExists.image){
      let filePath = path.join(__dirname,"../../uploadTools", isToolExists.image);
      fs.unlink(filePath);
    }
    let deleted = await this.prisma.tool.delete({where:{id}})
    return {deleted};
  }

  async updateImage(id:string, image:Express.Multer.File){
    let isToolExists = await this.prisma.tool.findFirst({where:{id}});
    if(!isToolExists){
      throw new BadRequestException("Tool not found")
    }
    const oldImage = isToolExists.image;
    if(oldImage){
      let filePath = path.join(__dirname,"../../uploadTools", oldImage);
      fs.unlink(filePath);
      return {Updated:image.filename}
    }
  }
}
