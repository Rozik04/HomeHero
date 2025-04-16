import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateToolDto {
  @ApiProperty({ description: 'Name of the tool in Russian', example: 'Молоток' })
  @IsString()
  @IsOptional()
  nameRu: string;

  @ApiProperty({ description: 'Name of the tool in Uzbek', example: 'Bolg\'a' })
  @IsString()
  @IsOptional()
  nameUz: string;

  @ApiProperty({ description: 'Name of the tool in English', example: 'Hammer' })
  @IsString()
  @IsOptional()
  nameEn: string;

  @ApiProperty({ description: 'Description of the tool in Russian', example: 'Прочный молоток для строительства' })
  @IsString()
  @IsOptional()
  descriptionRu: string;

  @ApiProperty({ description: 'Description of the tool in Uzbek', example: 'Qurilish uchun mustahkam bolg‘a' })
  @IsString()
  @IsOptional()
  descriptionUz: string;

  @ApiProperty({ description: 'Description of the tool in English', example: 'Durable hammer for construction' })
  @IsString()
  @IsOptional()
  descriptionEn: string;

  @ApiProperty({ description: 'Price of the tool', example: 120000 })
  @IsInt()
  @IsOptional()
  price: number;

  @ApiProperty({ description: 'Available quantity of the tool', example: 50 })
  @IsInt()
  @IsOptional()
  quantity: number;


  @ApiProperty({ description: 'ID of the brand', example: 'brand123' })
  @IsString()
  @IsOptional()
  brandID: string;

  @ApiProperty({ description: 'ID of the capacity', example: 'capacity456' })
  @IsString()
  @IsOptional()
  capacityID: string;

  @ApiProperty({ description: 'ID of the size', example: 'size789' })
  @IsString()
  @IsOptional()
  sizeID: string;

  @ApiProperty({ description: 'Image filename of the tool', example: 'tool.jpg' })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({ description: 'Indicates whether the tool is active or not', example: true })
  @IsBoolean()
  @IsOptional()

  isActive: boolean;
}
