import { Global, Module } from '@nestjs/common';
import { BotService } from './tgbot.service';
import {TelegrafModule} from 'nestjs-telegraf'
import * as dotenv from 'dotenv'
dotenv.config()

@Global()
@Module({
  imports:[TelegrafModule.forRoot({token: "7500021624:AAFqc10X7uMJagymP2rhwfp9ifkq6uDZ4FM", launchOptions: {dropPendingUpdates: true}})],
  exports:[BotService],
  providers: [BotService]
})
export class TgbotModule {}
