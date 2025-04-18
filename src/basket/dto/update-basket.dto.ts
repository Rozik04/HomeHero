import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  IsEnum
} from 'class-validator';
import { TimeUnit } from 'src/utils/enums';

export class UpdateBasketDto {
  @ApiPropertyOptional({
    description: 'Mahsulotning ID raqami (ixtiyoriy)',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6'
  })
  @IsString()
  @IsOptional()
  productID?: string;

  @ApiPropertyOptional({
    description: 'Asbobning (tool) ID raqami (ixtiyoriy)',
    example: '12345678-90ab-cdef-1234-567890abcdef'
  })
  @IsString()
  @IsOptional()
  toolID?: string;

  @ApiPropertyOptional({
    description: 'Daraja (level) ID raqami (ixtiyoriy)',
    example: 'abcdef12-3456-7890-abcd-ef1234567890'
  })
  @IsString()
  @IsOptional()
  levelID?: string;

  @ApiProperty({
    description: 'Vaqt birligi (day, hour)',
    example: "day",
    minimum: 1
  })
  @IsEnum(TimeUnit)
  @Min(1)
  timeUnit?: TimeUnit;

  @ApiPropertyOptional({
    description: 'Soni (ixtiyoriy), necha dona buyurtma qilinmoqda',
    example: 5,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  countOfTool?: number;

  @ApiPropertyOptional({
    description: 'Soni (ixtiyoriy), necha dona buyurtma qilinmoqda',
    example: 5,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  countOfProduct?: number;

  @ApiProperty({
    description: 'Nechi kun kerak? (1,2)',
    example: 1,
    minimum: 1
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  measure?: number;

  @ApiPropertyOptional({
    description: 'Ishlash soatlari soni (ixtiyoriy)',
    example: 8,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  workingHours: number;

}
