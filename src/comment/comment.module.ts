import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  imports:[JwtModule.register({secret:process.env.JWTSECRET, global:true, signOptions:{expiresIn:"1h"}}), PrismaModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
