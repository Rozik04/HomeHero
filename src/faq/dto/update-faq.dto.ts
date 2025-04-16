import { PartialType } from '@nestjs/mapped-types';
import { CreateFaqDto } from './create-faq.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFaqDto extends PartialType(CreateFaqDto) {
  @ApiPropertyOptional({ description: 'Savol (uzbek tilida)', example: 'To’lov qanday amalga oshiriladi?' })
  @IsString()
  @IsOptional()
  questionUz?: string;

  @ApiPropertyOptional({ description: 'Savol (rus tilida)', example: 'Как осуществляется оплата?' })
  @IsString()
  @IsOptional()
  questionRu?: string;

  @ApiPropertyOptional({ description: 'Savol (ingliz tilida)', example: 'How is the payment made?' })
  @IsString()
  @IsOptional()
  questionEn?: string;

  @ApiPropertyOptional({ description: 'Javob (uzbek tilida)', example: 'To’lov onlayn yoki naqd shaklda amalga oshiriladi.' })
  @IsString()
  @IsOptional()
  answerUz?: string;

  @ApiPropertyOptional({ description: 'Javob (rus tilida)', example: 'Оплата производится онлайн или наличными.' })
  @IsString()
  @IsOptional()
  answerRu?: string;

  @ApiPropertyOptional({ description: 'Javob (ingliz tilida)', example: 'Payment is made online or in cash.' })
  @IsString()
  @IsOptional()
  answerEn?: string;
}
