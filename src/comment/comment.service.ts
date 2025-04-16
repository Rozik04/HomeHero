import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, userId:string) {
    let data = await this.prisma.comment.create({ data: { ...createCommentDto, userID:userId} });
    let masterStars = await this.prisma.comment.findMany({where:{masterID:createCommentDto.masterID}});
    let countOfStars =  masterStars.length;
    let totalStars = masterStars.reduce((sum, comment) => sum + comment.star, 0);
    await this.prisma.master.update({where:{id:createCommentDto.masterID},data:{rating:totalStars/countOfStars}});
    return { data };
  }

  async findAll() {
    let alldata = await this.prisma.comment.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No comments found");
    }
    return { alldata };
  }

  async findOne(id: string) {
    let isCommentExists = await this.prisma.comment.findFirst({ where: { id } });
    if (!isCommentExists) {
      throw new BadRequestException("Comment not found");
    }
    return { Comment: isCommentExists };
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    let isCommentExists = await this.prisma.comment.findFirst({ where: { id } });
    if (!isCommentExists) {
      throw new BadRequestException("Comment not found");
    }
    let updatedComment = await this.prisma.comment.update({
      where: { id },
      data: { ...updateCommentDto },
    });
    return { Updated: updatedComment };
  }

  async remove(id: string) {
    let isCommentExists = await this.prisma.comment.findFirst({ where: { id } });
    if (!isCommentExists) {
      throw new BadRequestException("Comment not found");
    }
    let deletedComment = await this.prisma.comment.delete({ where: { id } });
    return { Deleted: deletedComment };
  }
}
