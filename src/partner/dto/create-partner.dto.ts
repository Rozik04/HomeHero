import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({ description: 'Hamkorning rus tilidagi nomi', example: 'Партнёр ООО' })
  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @ApiProperty({ description: 'Hamkorning o‘zbek tilidagi nomi', example: 'Hamkor MChJ' })
  @IsString()
  @IsNotEmpty()
  nameUz: string;

  @ApiProperty({ description: 'Hamkorning ingliz tilidagi nomi', example: 'Partner LLC' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ description: 'Hamkor logotipi yoki rasmi (URL yoki fayl nomi)', example: 'partner-logo.png' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Hamkorning aloqa raqami', example: '+998901234567' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'The link of partner', example: 'http://localhost:3000/api' })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ description: 'Hamkorning manzili', example: 'Toshkent shahri, Yakkasaroy tumani' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Hamkor faol holatda yoki yo‘qligi', example: true })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty({ description: 'To‘lov shartlari', example: '30 kun ichida to‘lash' })
  @IsString()
  @IsNotEmpty()
  paymentTerms: string;

  @ApiProperty({ description: 'Shartnoma boshlanish sanasi', example: '2025-01-01', required: false })
  @IsDateString()
  @IsOptional()
  agreementStart: Date = new Date();

  @ApiProperty({ description: 'Shartnoma tugash sanasi', example: '2026-01-01' })
  @IsDateString()
  @IsNotEmpty()
  agreementEnd: Date;
}
