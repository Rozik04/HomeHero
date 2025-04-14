import { Module } from '@nestjs/common';
import { ShowCaseService } from './show-case.service';
import { ShowCaseController } from './show-case.controller';
import* as dotenv from 'dotenv'
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
dotenv.config()

@Module({
  imports:[JwtModule.register({global:true, secret:process.env.JWTSECRET, signOptions:{expiresIn:"1h"}}),  PrismaModule],
  controllers: [ShowCaseController],
  providers: [ShowCaseService],
})
export class ShowCaseModule {}
