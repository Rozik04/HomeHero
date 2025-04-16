import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsNumber, IsArray, IsUUID } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ description: 'Name of the product in Russian', example: 'Электродрель', required: false })
  @IsOptional()
  @IsString()
  nameRu?: string;

  @ApiProperty({ description: 'Name of the product in Uzbek', example: 'Elektrodrill', required: false })
  @IsOptional()
  @IsString()
  nameUz?: string;

  @ApiProperty({ description: 'Name of the product in English', example: 'Electric drill', required: false })
  @IsOptional()
  @IsString()
  nameEn?: string;

  @ApiProperty({ description: 'Image filename or path', example: 'product-image.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'Indicates whether the product is active or not', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Number of working hours available for the product', example: 5, required: false })
  @IsOptional()
  @IsNumber()
  workingHours?: number;

  @ApiProperty({ description: 'Rental price per hour', example: 25000, required: false })
  @IsOptional()
  @IsNumber()
  hourlyPrice?: number;

  @ApiProperty({ description: 'Rental price per day', example: 100000, required: false })
  @IsOptional()
  @IsNumber()
  dailyPrice?: number;

  @ApiProperty({
    description: 'List of level IDs associated with the product (UUID format)',
    example: ['fd8b21d0-b3e4-4c2a-8dc1-61f4f3fc3a92'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  levelIDs?: string[];

  @ApiProperty({
    description: 'List of tool IDs associated with the product (UUID format)',
    example: ['26a0a4e9-66be-4e52-a85d-f2b5d1df5d59'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  toolIDs?: string[];
}
