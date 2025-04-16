import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ description: 'The russian name of the brand', example: 'Найк' })
  @IsNotEmpty()
  @IsString()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the brand', example: 'Nayk' })
  @IsNotEmpty()
  @IsString()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the brand', example: 'Nike' })
  @IsNotEmpty()
  @IsString()
  nameEn: string;
}
