import { Module } from '@nestjs/common';
import { OrderMasterService } from './order-master.service';
import { OrderMasterController } from './order-master.controller';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
dotenv.config()

@Module({
  imports:[JwtModule.register({secret:process.env.JWTSECRET, global:true, signOptions:{expiresIn:"1h"}}), PrismaModule],
  controllers: [OrderMasterController],
  providers: [OrderMasterService],
})
export class OrderMasterModule {}
