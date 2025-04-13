import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { SizeModule } from './size/size.module';
import { CapacityModule } from './capacity/capacity.module';
import { ToolModule } from './tool/tool.module';
import { LevelModule } from './level/level.module';
import { MasterJobsModule } from './master-jobs/master-jobs.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, RegionModule, UserModule, BrandModule, SizeModule, CapacityModule, ToolModule, LevelModule, MasterJobsModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
