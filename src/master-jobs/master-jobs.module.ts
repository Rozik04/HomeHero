import { Module } from '@nestjs/common';
import { MasterJobsService } from './master-jobs.service';
import { MasterJobsController } from './master-jobs.controller';
import* as dotenv from 'dotenv'
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
dotenv.config()

@Module({
  imports:[JwtModule.register({global:true, secret:process.env.JWTSECRET, signOptions:{expiresIn:"1h"}}),  PrismaModule],
  controllers: [MasterJobsController],
  providers: [MasterJobsService],
})
export class MasterJobsModule {}
