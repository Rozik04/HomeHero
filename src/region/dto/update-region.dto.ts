import { PartialType } from '@nestjs/mapped-types';
import { CreateRegionDto } from './create-region.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
  @ApiProperty({ description: 'The russian name of the region', example: 'Ташкентская область', required: false })
  @IsOptional()
  @IsString()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the region', example: 'Toshkent viloyati', required: false })
  @IsOptional()
  @IsString()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the region', example: 'Tashkent region', required: false })
  @IsOptional()
  @IsString()
  nameEn: string;
}
