import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('comments')
@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createCommentDto: CreateCommentDto, userId: string) {
    let data = await this.prisma.comment.create({ data: { ...createCommentDto, userID: userId } });
    let masterStars = await this.prisma.comment.findMany({ where: { masterID: createCommentDto.masterID } });
    let countOfStars = masterStars.length;
    let totalStars = masterStars.reduce((sum, comment) => sum + comment.star, 0);
    await this.prisma.master.update({ where: { id: createCommentDto.masterID }, data: { rating: totalStars / countOfStars } });
    return { data };
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'List of all comments.' })
  @ApiResponse({ status: 400, description: 'No comments found.' })
  async findAll() {
    let alldata = await this.prisma.comment.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No comments found");
    }
    return { alldata };
  }

  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Comment ID' })
  @ApiResponse({ status: 200, description: 'The comment with the given ID.' })
  @ApiResponse({ status: 400, description: 'Comment not found.' })
  async findOne(id: string) {
    let isCommentExists = await this.prisma.comment.findFirst({ where: { id } });
    if (!isCommentExists) {
      throw new BadRequestException("Comment not found");
    }
    return { Comment: isCommentExists };
  }

  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Comment ID' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({ status: 200, description: 'The comment has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Comment not found.' })
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

  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Comment ID' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Comment not found.' })
  async remove(id: string) {
    let isCommentExists = await this.prisma.comment.findFirst({ where: { id } });
    if (!isCommentExists) {
      throw new BadRequestException("Comment not found");
    }
    let deletedComment = await this.prisma.comment.delete({ where: { id } });
    return { Deleted: deletedComment };
  }
}
