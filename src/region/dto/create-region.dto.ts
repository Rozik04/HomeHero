import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ description: 'The russian name of the region', example: 'Ташкент' })
  @IsNotEmpty()
  @IsString()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the region', example: 'Toshkent' })
  @IsNotEmpty()
  @IsString()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the region', example: 'Tashkent' })
  @IsNotEmpty()
  @IsString()
  nameEn: string;
}
