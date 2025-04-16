import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({ description: 'Savol (uzbek tilida)', example: 'To’lov qanday amalga oshiriladi?' })
  @IsString()
  @IsNotEmpty()
  questionUz: string;

  @ApiProperty({ description: 'Savol (rus tilida)', example: 'Как осуществляется оплата?' })
  @IsString()
  @IsNotEmpty()
  questionRu: string;

  @ApiProperty({ description: 'Savol (ingliz tilida)', example: 'How is the payment made?' })
  @IsString()
  @IsNotEmpty()
  questionEn: string;

  @ApiProperty({ description: 'Javob (uzbek tilida)', example: 'To’lov onlayn yoki naqd shaklda amalga oshiriladi.' })
  @IsString()
  @IsNotEmpty()
  answerUz: string;

  @ApiProperty({ description: 'Javob (rus tilida)', example: 'Оплата производится онлайн или наличными.' })
  @IsString()
  @IsNotEmpty()
  answerRu: string;

  @ApiProperty({ description: 'Javob (ingliz tilida)', example: 'Payment is made online or in cash.' })
  @IsString()
  @IsNotEmpty()
  answerEn: string;
}
