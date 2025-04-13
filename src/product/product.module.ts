import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import* as dotenv from 'dotenv'
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
dotenv.config()

@Module({
  imports:[JwtModule.register({global:true, secret:process.env.JWTSECRET, signOptions:{expiresIn:"1h"}}),  PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
