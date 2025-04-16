import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGeneralInfoDto {
  @ApiPropertyOptional({ description: 'Aloqa uchun email manzil', example: 'example@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Rasmiy veb-sayt yoki ijtimoiy tarmoq havolasi', example: 'https://www.example.com' })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiPropertyOptional({ description: 'Ofis yoki tashkilot manzili', example: 'Toshkent shahri, Chilonzor tumani, 9-kvartal' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ description: 'Aloqa uchun telefon raqami', example: '+998901234567' })
  @IsString()
  @IsOptional()
  phone?: string;
}
