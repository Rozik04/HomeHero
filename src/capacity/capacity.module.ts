import { Module } from '@nestjs/common';
import { CapacityService } from './capacity.service';
import { CapacityController } from './capacity.controller';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
dotenv.config()

@Module({
  imports:[JwtModule.register({secret:process.env.JWTSECRET, global:true, signOptions:{expiresIn:"1h"}}), PrismaModule],
  controllers: [CapacityController],
  providers: [CapacityService],
})
export class CapacityModule {}
