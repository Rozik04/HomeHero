import { IsArray, IsBoolean, IsNotEmpty, IsString, IsUUID, IsOptional, IsInt, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class LevelWithDetailsDto {
  @IsUUID()
  levelID: string;

  @IsOptional()
  @IsInt()
  workingHours?: number;

  @IsOptional()
  @IsInt()
  hourlyPrice?: number;

  @IsOptional()
  @IsInt()
  dailyPrice?: number;
}




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

  
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({description: 'Array of levels with their details (Optional)', example: [
    { levelID: 'level-uuid-1', workingHours: 5, hourlyPrice: 25000, dailyPrice: 100000 }],})
  @Type(() => LevelWithDetailsDto)
  levels?: LevelWithDetailsDto[];
  

  @ApiProperty({
    description: 'Array of tool UUIDs associated with the product (Optional)',
    example: ['tool-uuid-1', 'tool-uuid-2'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  toolIDs?: string[];
  }
  

