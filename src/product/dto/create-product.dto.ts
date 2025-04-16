import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The russian name of the product', example: 'Электродрель' })
  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the product', example: 'Elektrodrill' })
  @IsString()
  @IsNotEmpty()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the product', example: 'Electric drill' })
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

  @ApiProperty({ description: 'Working hours for the product', example: 5 })
  @IsNumber()
  @IsNotEmpty()
  workingHours: number;

  @ApiProperty({ description: 'Hourly rental price', example: 25000 })
  @IsNumber()
  @IsNotEmpty()
  hourlyPrice: number;

  @ApiProperty({ description: 'Daily rental price', example: 100000 })
  @IsNumber()
  @IsNotEmpty()
  dailyPrice: number;

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
}
