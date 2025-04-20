import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotService implements OnModuleInit {
  constructor(@InjectBot() private readonly bot: Telegraf) {}

  async onModuleInit() {
    try {
      await this.bot.telegram.deleteWebhook({ drop_pending_updates: true });
      this.bot.on('text', (ctx) => {
        ctx.reply(`Welcome to Home Hero Bot!`);
      });    
      console.log('✅ Bot muvaffaqiyatli ishga tushdi!');

    } catch (err) {
      console.error('❌ Botni ishga tushirishda xatolik:', err);
    }
  }

  async sendMessage(message: string) {
    const chatId = 6830593548;
    await this.bot.telegram.sendMessage(chatId, message);
  }
}




