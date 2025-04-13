import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
dotenv.config()

@Module({
  imports:[JwtModule.register({secret:process.env.JWTSECRET, global:true, signOptions:{expiresIn:"1h"}}), PrismaModule],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
