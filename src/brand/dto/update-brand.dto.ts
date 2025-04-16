import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @ApiProperty({ description: 'The russian name of the brand', example: 'Найк', required: false })
  @IsOptional()
  @IsString()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the brand', example: 'Nayk', required: false })
  @IsOptional()
  @IsString()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the brand', example: 'Nike', required: false })
  @IsOptional()
  @IsString()
  nameEn: string;
}
