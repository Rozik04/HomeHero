import { PartialType } from '@nestjs/mapped-types';
import { CreateSizeDto } from './create-size.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateSizeDto extends PartialType(CreateSizeDto) {
      @ApiProperty({ description: 'The russian name of the size', example: 'Маленький',required: false })
      @IsOptional()
      @IsString()
      nameRu: string;
    
      @ApiProperty({ description: 'The uzbek name of the size', example: 'Kichik', required: false })
      @IsOptional()
      @IsString()
      nameUz: string;
    
      @ApiProperty({ description: 'The english name of the size', example: 'Small', required: false })
      @IsOptional()
      @IsString()
      nameEn: string;
}
