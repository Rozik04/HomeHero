import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterDto } from './create-master.dto';
import {
    IsBoolean,
    IsDecimal,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import { Decimal } from 'generated/prisma/runtime/library';

export class UpdateMasterDto extends PartialType(CreateMasterDto) {
    @ApiPropertyOptional({ description: 'Name of the master in Russian', example: 'Алишер' })
    @IsString()
    @IsOptional()
    nameRu?: string;
  
    @ApiPropertyOptional({ description: 'Name of the master in Uzbek', example: 'Alisher' })
    @IsString()
    @IsOptional()
    nameUz?: string;
  
    @ApiPropertyOptional({ description: 'Name of the master in English', example: 'Alisher' })
    @IsString()
    @IsOptional()
    nameEn?: string;
  
    @ApiPropertyOptional({ description: 'Is the master currently active?', example: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
  
    @ApiPropertyOptional({ description: 'Phone number of the master', example: '+998901234567' })
    @IsString()
    @IsOptional()
    phone?: string;
  
    @ApiPropertyOptional({ description: 'Date of birth of the master (YYYY-MM-DD)', example: '1990-01-01' })
    @IsString()
    @IsOptional()
    dob?: string;
  
    @ApiPropertyOptional({ description: 'Image path or filename of the master', example: 'master-photo.jpg' })
    @IsString()
    @IsOptional()
    image?: string;
  
    @ApiPropertyOptional({ description: 'Passport image of the master', example: 'passport-photo.jpg' })
    @IsString()
    @IsOptional()
    passportImage?: string;

    @ApiProperty({ description: 'About master', example: 'Experienced plumber with over 10 years of expertise in residential and commercial plumbing services.', })
    @IsString()
    @IsNotEmpty()
    about: string;
  

}
