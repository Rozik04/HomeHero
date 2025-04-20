import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import * as dotenv from 'dotenv';
import { TgbotModule } from 'src/tgbot/tgbot.module'; 
dotenv.config()

@Module({
  imports:[JwtModule.register({secret:process.env.JWTSECRET, global:true, signOptions:{expiresIn:"1h"}}), PrismaModule,TgbotModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
