import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/utils/enums';

export class CreateUserDto {
  @ApiProperty({ example: 'Али Валиев', description: 'User\'s name in Russian' })
  @IsNotEmpty()
  @IsString()
  nameRu: string;

  @ApiProperty({ example: 'Ali Valiyev', description: 'User\'s name in Uzbek' })
  @IsNotEmpty()
  @IsString()
  nameUz: string;

  @ApiProperty({ example: 'Ali Valiyev', description: 'User\'s name in English' })
  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @ApiProperty({ example: 'yusupovruzimuhammad4@gmail.com', description: 'User\'s email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password1234', description: 'User\'s password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: '+998901234567', description: 'User\'s phone number' })
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({ example: 'image.jpg', description: 'User\'s profile image' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 'admin', description: 'User\'s role' })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 'Tashkent', description: 'User\'s region ID' })
  @IsNotEmpty()
  @IsString()
  regionID: string;

  @ApiProperty({ example: 'Tashkent, Uzbekistan', description: 'User\'s location' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiPropertyOptional({ example: 'AB1234567', description: 'User\'s passport series (optional)' })
  @IsOptional()
  @IsString()
  passportSeries: string;

  @ApiPropertyOptional({ example: '123456789012', description: 'User\'s INN (optional)' })
  @IsOptional()
  @IsString()
  inn: string;
}
