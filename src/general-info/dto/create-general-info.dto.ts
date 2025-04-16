import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGeneralInfoDto {
  @ApiProperty({ description: 'Aloqa uchun email manzil', example: 'example@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Rasmiy veb-sayt yoki ijtimoiy tarmoq havolasi', example: 'https://www.example.com' })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ description: 'Ofis yoki tashkilot manzili', example: 'Toshkent shahri, Chilonzor tumani, 9-kvartal' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Aloqa uchun telefon raqami', example: '+998901234567' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
