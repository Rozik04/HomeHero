import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export enum ShowCaseType {
  slider = 'slider',
  banner = 'banner',
  card = 'card',
}

export class UpdateShowCaseDto {
  @ApiPropertyOptional({ description: 'Ko‘rgazma rus tilidagi nomi', example: 'Слайдер акция' })
  @IsString()
  @IsOptional()
  nameRu?: string;

  @ApiPropertyOptional({ description: 'Ko‘rgazma o‘zbek tilidagi nomi', example: 'Slayder aksiyasi' })
  @IsString()
  @IsOptional()
  nameUz?: string;

  @ApiPropertyOptional({ description: 'Ko‘rgazma ingliz tilidagi nomi', example: 'Slider Promotion' })
  @IsString()
  @IsOptional()
  nameEn?: string;

  @ApiPropertyOptional({ description: 'Rus tilida tavsif', example: 'Описание акции на русском' })
  @IsString()
  @IsOptional()
  descriptionRu?: string;

  @ApiPropertyOptional({ description: 'O‘zbek tilida tavsif', example: 'Aksiyaning o‘zbekcha tavsifi' })
  @IsString()
  @IsOptional()
  descriptionUz?: string;

  @ApiPropertyOptional({ description: 'Ingliz tilida tavsif', example: 'Description of the promotion in English' })
  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @ApiPropertyOptional({ description: 'Rasm fayli nomi yoki URL', example: 'slider-image.jpg' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({ description: 'Ko‘rgazma uchun link (havola)', example: 'https://example.com/promotion' })
  @IsString()
  @IsOptional()
  link?: string;

  @ApiPropertyOptional({ description: 'Ko‘rgazma turi (slider, banner, card)', enum: ShowCaseType, example: ShowCaseType.slider })
  @IsEnum(ShowCaseType)
  @IsOptional()
  type?: ShowCaseType;

  @ApiPropertyOptional({ description: 'Ko‘rgazma faolmi yoki yo‘qmi', example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Tugash sanasi', example: "2025-12-31T23:59:59.999Z" })
  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
