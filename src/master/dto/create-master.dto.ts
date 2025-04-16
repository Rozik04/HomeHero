import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from 'generated/prisma/runtime/library';

export class CreateMasterDto {
  @ApiProperty({ description: 'Name of the master in Russian', example: 'Алишер' })
  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @ApiProperty({ description: 'Name of the master in Uzbek', example: 'Alisher' })
  @IsString()
  @IsNotEmpty()
  nameUz: string;

  @ApiProperty({ description: 'Name of the master in English', example: 'Alisher' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ description: 'Is the master currently active?', example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ description: 'Phone number of the master', example: '+998901234567' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Date of birth of the master (YYYY-MM-DD)', example: '1990-01-01' })
  @IsString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({ description: 'Image path or filename of the master', example: 'master-photo.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Passport image of the master', example: 'passport-photo.jpg' })
  @IsString()
  @IsNotEmpty()
  passportImage: string;

}
