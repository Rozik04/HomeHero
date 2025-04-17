import { IsArray, IsBoolean, IsNotEmpty, IsString, IsUUID, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The russian name of the product', example: 'Электрик' })
  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the product', example: 'Elektrik' })
  @IsString()
  @IsNotEmpty()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the product', example: 'Electric' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ description: 'Image filename or path', example: 'product-image.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Is the product active?', example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({
    description: 'Array of level UUIDs associated with the product',
    example: ['level-uuid-1', 'level-uuid-2'],
    type: [String],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  levelIDs: string[];

  @ApiProperty({
    description: 'Array of tool UUIDs associated with the product',
    example: ['tool-uuid-1', 'tool-uuid-2'],
    type: [String],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  toolIDs: string[];

  @ApiProperty({
    description: 'Working hours for the product (Optional)',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  workingHours?: number;

  @ApiProperty({
    description: 'Hourly price for the product (Optional)',
    example: 25000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  hourlyPrice?: number;

  @ApiProperty({
    description: 'Daily price for the product (Optional)',
    example: 100000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  dailyPrice?: number;
}
