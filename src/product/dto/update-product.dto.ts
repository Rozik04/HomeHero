import { IsArray, IsBoolean, IsNotEmpty, IsString, IsUUID, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { LevelWithDetailsDto } from './create-product.dto'; // Agar kerak bo'lsa, import qiling

export class UpdateProductDto {
  @ApiProperty({ description: 'The russian name of the product', example: 'Электрик', required: false })
  @IsOptional()
  @IsString()
  nameRu?: string;

  @ApiProperty({ description: 'The uzbek name of the product', example: 'Elektrik', required: false })
  @IsOptional()
  @IsString()
  nameUz?: string;

  @ApiProperty({ description: 'The english name of the product', example: 'Electric', required: false })
  @IsOptional()
  @IsString()
  nameEn?: string;

  @ApiProperty({ description: 'Image filename or path', example: 'product-image.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'Is the product active?', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({description: 'Array of levels with their details (Optional)', example: [
  { levelID: 'level-uuid-1', workingHours: 5, hourlyPrice: 25000, dailyPrice: 100000 }
    ],
    required: false,
    type: [LevelWithDetailsDto]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LevelWithDetailsDto)
  levels?: LevelWithDetailsDto[];

  @ApiProperty({
    description: 'Array of tool UUIDs associated with the product (Optional)',
    example: ['tool-uuid-1', 'tool-uuid-2'],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  toolIDs?: string[];
}
