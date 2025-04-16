import { PartialType } from '@nestjs/mapped-types';
import { CreateCapacityDto } from './create-capacity.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCapacityDto extends PartialType(CreateCapacityDto) {
  @ApiProperty({ description: 'The russian name of the capacity', example: 'Маленький', required: false })
  @IsOptional()
  @IsString()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the capacity', example: 'Kichik', required: false })
  @IsOptional()
  @IsString()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the capacity', example: 'Small', required: false })
  @IsOptional()
  @IsString()
  nameEn: string;
}
