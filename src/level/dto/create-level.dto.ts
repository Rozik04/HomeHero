import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLevelDto {
  @ApiProperty({ description: 'The russian name of the level', example: 'Начальный' })
  @IsNotEmpty()
  @IsString()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the level', example: 'Boshlang\'ich' })
  @IsNotEmpty()
  @IsString()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the level', example: 'Beginner' })
  @IsNotEmpty()
  @IsString()
  nameEn: string;
}
