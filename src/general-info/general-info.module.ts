import { Module } from '@nestjs/common';
import { GeneralInfoService } from './general-info.service';
import { GeneralInfoController } from './general-info.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  imports:[JwtModule.register({secret:process.env.JWTSECRET, global:true, signOptions:{expiresIn:"1h"}}), PrismaModule],
  controllers: [GeneralInfoController],
  providers: [GeneralInfoService],
})
export class GeneralInfoModule {}
