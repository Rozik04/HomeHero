import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ description: 'The russian name of the contact', example: 'Азамат' })
  @IsNotEmpty()
  @IsString()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the contact', example: 'Azamat' })
  @IsNotEmpty()
  @IsString()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the contact', example: 'Azamat' })
  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @ApiProperty({ description: 'Phone number of the contact (in international format)', example: '+998901234567' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: 'Address of the contact', example: 'Tashkent, Chilonzor district' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Message or note from the contact', example: 'I would like to get more information about your services.' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ description: 'Email address of the contact', example: 'example@mail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
