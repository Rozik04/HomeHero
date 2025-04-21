import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum ShowCaseType {
  slider = 'slider',
  banner = 'banner',
  card = 'card',
}

export class CreateShowCaseDto {
  @ApiProperty({ description: 'Ko‘rgazma rus tilidagi nomi', example: 'Слайдер акция' })
  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @ApiProperty({ description: 'Ko‘rgazma o‘zbek tilidagi nomi', example: 'Slayder aksiyasi' })
  @IsString()
  @IsNotEmpty()
  nameUz: string;

  @ApiProperty({ description: 'Ko‘rgazma ingliz tilidagi nomi', example: 'Slider Promotion' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ description: 'Rus tilida tavsif', example: 'Описание акции на русском' })
  @IsString()
  @IsNotEmpty()
  descriptionRu: string;

  @ApiProperty({ description: 'O‘zbek tilida tavsif', example: 'Aksiyaning o‘zbekcha tavsifi' })
  @IsString()
  @IsNotEmpty()
  descriptionUz: string;

  @ApiProperty({ description: 'Ingliz tilida tavsif', example: 'Description of the promotion in English' })
  @IsString()
  @IsNotEmpty()
  descriptionEn: string;

  @ApiProperty({ description: 'Rasm fayli nomi yoki URL', example: 'slider-image.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Ko‘rgazma uchun link (havola)', example: 'https://example.com/promotion' })
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ description: 'Ko‘rgazma turi (slider, banner, card)', enum: ShowCaseType, example: ShowCaseType.slider })
  @IsEnum(ShowCaseType)
  @IsNotEmpty()
  type: ShowCaseType;

  @ApiProperty({ description: 'Ko‘rgazma faolmi yoki yo‘qmi', example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ description: 'Tugash sanasi', example: "2025-12-31T23:59:59.999Z" })
  @IsDateString()
  @IsNotEmpty()

  endDate: Date
}
