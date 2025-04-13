import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  imports:[JwtModule.register({secret:process.env.JWTSECRET, global:true, signOptions:{expiresIn:"1h"}}), PrismaModule],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
