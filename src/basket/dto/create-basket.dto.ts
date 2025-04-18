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

export class CreateBasketDto {
  @ApiProperty({
    description: 'Mahsulotning ID raqami',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6'
  })
  @IsString()
  @IsNotEmpty()
  productID?: string;

  @ApiProperty({
    description: 'Asbobning (tool) ID raqami',
    example: '12345678-90ab-cdef-1234-567890abcdef'
  })
  @IsString()
  @IsNotEmpty()
  toolID?: string;

  @ApiProperty({
    description: 'Daraja (level) ID raqami',
    example: 'abcdef12-3456-7890-abcd-ef1234567890'
  })
  @IsString()
  @IsNotEmpty()
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
    description: 'Soni (ixtiyoriy), necha dona buyurtma qilinmoqda',
    example: 5,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  countOfProduct?: number;

  @ApiProperty({
    description: 'Ishlash soatlari soni',
    example: 8,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  workingHours: number;

}
