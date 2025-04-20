import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.individualuser, UserRole.legaluser])
  @Post()
  create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    let userId = req.user.id;
    return this.commentService.create(createCommentDto,userId);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin, UserRole.superadmin])
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin,  UserRole.individualuser, UserRole.legaluser])
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    let roles = req.user.role;
    let userId = req.user.id;
    return this.commentService.findOne(id, userId, roles);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin,  UserRole.superadmin])
  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    let role = req.user.role;
    let userId = req.user.id;
    return this.commentService.update(id, updateCommentDto, userId, role);
  }

  @UseGuards(JwtAuthGuard, JwtRoleGuard)
  @Roles([UserRole.admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
