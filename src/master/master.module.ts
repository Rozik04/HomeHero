import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import* as dotenv from 'dotenv'
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
dotenv.config()

@Module({
  imports:[JwtModule.register({global:true, secret:process.env.JWTSECRET, signOptions:{expiresIn:"1h"}}),  PrismaModule],
  controllers: [MasterController],
  providers: [MasterService],
})
export class MasterModule {}
