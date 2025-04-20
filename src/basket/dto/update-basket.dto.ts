import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsEnum,
} from 'class-validator';
import { TimeUnit } from 'src/utils/enums';

export class UpdateBasketDto {
  @ApiProperty({
    description: 'Basket (savat) elementining ID raqami',
    example: 'b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6'
  })
  @IsString()
  id: string; 

  @ApiProperty({
    description: 'Basket (savat) elementining userID raqami',
    example: 'b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6'
  })
  @IsString()
  userID: string; 



  @ApiPropertyOptional({
    description: 'Mahsulotning ID raqami',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6'
  })
  @IsString()
  @IsOptional()
  productID?: string;

  @ApiPropertyOptional({
    description: 'Asbobning (tool) ID raqami',
    example: '12345678-90ab-cdef-1234-567890abcdef'
  })
  @IsString()
  @IsOptional()
  toolID?: string;

  @ApiPropertyOptional({
    description: 'Daraja (level) ID raqami',
    example: 'abcdef12-3456-7890-abcd-ef1234567890'
  })
  @IsString()
  @IsOptional()
  levelID?: string;

  @ApiPropertyOptional({
    description: 'Vaqt birligi (day, hour)',
    example: 'day'
  })
  @IsEnum(TimeUnit)
  @IsOptional()
  timeUnit?: TimeUnit;

  @ApiPropertyOptional({
    description: 'Asboblar soni',
    example: 5
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  countOfTool?: number;

  @ApiPropertyOptional({
    description: 'Nechi kun kerak?',
    example: 2
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  measure?: number;

  @ApiPropertyOptional({
    description: 'Mahsulotlar soni',
    example: 5
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  countOfProduct?: number;

  @ApiPropertyOptional({
    description: 'Kunlik narx',
    example: 50000
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  dailyPrice?: number;

  @ApiPropertyOptional({
    description: 'Soatlik narx',
    example: 50000
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  hourlyPrice?: number;

  @ApiPropertyOptional({
    description: 'Ishlash soatlari soni',
    example: 8
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  workingHours?: number;
}

export class UpdateBasketArrayDto {
  @ApiProperty({
    type: [UpdateBasketDto],
    description: 'Array of basket items to be updated'
  })
  baskets: UpdateBasketDto[];
}
