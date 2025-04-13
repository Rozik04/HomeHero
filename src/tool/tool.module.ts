import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
dotenv.config()

@Module({
  imports:[JwtModule.register({secret:process.env.JWTSECRET, global:true, signOptions:{expiresIn:"1h"}}), PrismaModule],
  controllers: [ToolController],
  providers: [ToolService],
})
export class ToolModule {}
