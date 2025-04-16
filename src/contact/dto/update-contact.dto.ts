import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateContactDto {
  @ApiPropertyOptional({ description: 'The russian name of the contact', example: 'Азамат' })
  @IsOptional()
  @IsString()
  nameRu?: string;

  @ApiPropertyOptional({ description: 'The uzbek name of the contact', example: 'Azamat' })
  @IsOptional()
  @IsString()
  nameUz?: string;

  @ApiPropertyOptional({ description: 'The english name of the contact', example: 'Azamat' })
  @IsOptional()
  @IsString()
  nameEn?: string;

  @ApiPropertyOptional({ description: 'Phone number of the contact (in international format)', example: '+998901234567' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({ description: 'Address of the contact', example: 'Tashkent, Chilonzor district' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Message or note from the contact', example: 'I would like to get more information about your services.' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({ description: 'Email address of the contact', example: 'example@mail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}
