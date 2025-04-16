import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCapacityDto {
  @ApiProperty({ description: 'The russian name of the capacity', example: 'Маленький' })
  @IsNotEmpty()
  @IsString()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the capacity', example: 'Kichik' })
  @IsNotEmpty()
  @IsString()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the capacity', example: 'Small' })
  @IsNotEmpty()
  @IsString()
  nameEn: string;
}
