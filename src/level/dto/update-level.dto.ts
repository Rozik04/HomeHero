import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelDto } from './create-level.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
  @ApiProperty({ description: 'The russian name of the level', example: 'Начальный', required: false })
  @IsOptional()
  @IsString()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the level', example: 'Boshlang‘ich', required: false })
  @IsOptional()
  @IsString()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the level', example: 'Beginner', required: false })
  @IsOptional()
  @IsString()
  nameEn: string;
}
