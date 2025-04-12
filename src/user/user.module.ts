import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import* as dotenv from 'dotenv'
import { JwtModule } from '@nestjs/jwt';
dotenv.config()

@Module({
  imports:[JwtModule.register({global:true, secret:process.env.JWTSECRET, signOptions:{expiresIn:"1h"}}),  PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
