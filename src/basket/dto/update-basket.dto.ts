import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min
} from 'class-validator';

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

  @ApiPropertyOptional({
    description: 'Vaqt birligi (ixtiyoriy) (1 = kun, 2 = hafta, 3 = oy kabi)',
    example: 1,
    minimum: 1
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  timeUnit?: number;

  @ApiPropertyOptional({
    description: 'Soni (ixtiyoriy), necha dona buyurtma qilinmoqda',
    example: 5,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  count?: number;

  @ApiPropertyOptional({
    description: 'Ishlash soatlari soni (ixtiyoriy)',
    example: 8,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  workingHours?: number;

  @ApiPropertyOptional({
    description: 'Umumiy narx (ixtiyoriy, avtomatik hisoblanishi mumkin)',
    example: 150000,
    minimum: 0
  })
  @IsInt()
  @IsOptional()
  totalPrice?: number;
}
