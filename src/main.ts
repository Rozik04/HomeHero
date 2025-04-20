import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Telegraf } from 'telegraf';
import { TelegrafModule } from 'nestjs-telegraf';
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Home Hero')
    .setDescription('The "Home Hero" management API')
    .setVersion('1.0')
    .addTag('exam')
    .addSecurityRequirements("bearer",['bearer'])
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
