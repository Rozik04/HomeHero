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
    const { message, orderID, ratings } = createCommentDto;
  
    const comment = await this.prisma.comment.create({
      data: {
        message,
        orderID, 
        userID: userId,
        ratings: {
          create: ratings.map(rating => ({
            masterID: rating.masterID,
            star: rating.star,
          })),
        },
      },
      include: {
        ratings: true,
      },
    });
  
    await this.prisma.order.update({where:{id:orderID},data:{status:'delivered'}})

    const uniqueMasterIDs = [
      ...new Set(ratings.map((rating) => rating.masterID)),
    ];
  
    for (const masterID of uniqueMasterIDs) {
      const allRatings = await this.prisma.commentRating.findMany({
        where: { masterID },
        select: { star: true },
      });
  
      const totalStars = allRatings.reduce((sum, r) => sum + r.star, 0);
      const avgRating = totalStars / allRatings.length;
  
      await this.prisma.master.update({
        where: { id: masterID },
        data: { rating: avgRating },
      });
    }
  
    return comment;
  }
  
  

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'List of all comments.' })
  @ApiResponse({ status: 400, description: 'No comments found.' })
  async findAll() {
    let alldata = await this.prisma.comment.findMany();
    return  alldata ;
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
    return  isCommentExists ;
  }


  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Comment ID' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({ status: 200, description: 'The comment has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Comment not found.' })
  async update(id: string, updateDto: UpdateCommentDto) {
    const { message, ratings } = updateDto;
  
    if (ratings && ratings.length > 0) {
      await this.prisma.commentRating.deleteMany({
        where: { commentID: id },
      });
    }
  
    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: {
        message,
        ratings: ratings
          ? {
              create: ratings.map(rating => ({
                star: rating.star,
                masterID: rating.masterID,
              })),
            }
          : undefined,
      },
      include: {
        ratings: true,
      },
    });
  
    return updatedComment;
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
    return  deletedComment ;
  }
}
