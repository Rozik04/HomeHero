import { Global, Module } from '@nestjs/common';
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
import { MasterModule } from './master/master.module';
import { FaqModule } from './faq/faq.module';
import { GeneralInfoModule } from './general-info/general-info.module';
import { PartnerModule } from './partner/partner.module';
import { ShowCaseModule } from './show-case/show-case.module';
import { ContactModule } from './contact/contact.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { BasketModule } from './basket/basket.module';
import { CommentModule } from './comment/comment.module';
import { OrderMasterModule } from './order-master/order-master.module';
import { TgbotModule } from './tgbot/tgbot.module';        
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './tgbot/tgbot.service';

@Global()
@Module({
  imports: [PrismaModule, RegionModule, UserModule, BrandModule, SizeModule, CapacityModule, ToolModule, LevelModule, MasterJobsModule, ProductModule, MasterModule, FaqModule, GeneralInfoModule, PartnerModule, ShowCaseModule, ContactModule, OrderModule, OrderItemModule, BasketModule, CommentModule, OrderMasterModule, TgbotModule ],
  controllers: [AppController],
  providers: [AppService, BotService],
})
export class AppModule {}
