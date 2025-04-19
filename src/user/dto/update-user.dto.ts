import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/utils/enums';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ example: 'Али Валиев', description: 'User\'s name in Russian' })
    @IsOptional()
    @IsString()
      nameRu: string;
    
      @ApiProperty({ example: 'Ali Valiyev', description: 'User\'s name in Uzbek' })
      @IsOptional()
      @IsString()
      nameUz: string;
    
      @ApiProperty({ example: 'Ali Valiyev', description: 'User\'s name in English' })
      @IsOptional()
      @IsString()
      nameEn: string;
    
      @ApiProperty({ example: 'ali@example.com', description: 'User\'s email address' })
      @IsOptional()
      @IsEmail()
      email: string;
    
      @ApiProperty({ example: 'password123', description: 'User\'s password' })
      @IsOptional()
      @IsString()
      password: string;
    
      @ApiProperty({ example: '+998901234567', description: 'User\'s phone number' })
      @IsOptional()
      @IsPhoneNumber('UZ')
      phone: string;
    
      @ApiProperty({ example: 'image.jpg', description: 'User\'s profile image' })
      @IsOptional()
      @IsString()
      image: string;
    
      @ApiProperty({ example: 'admin', description: 'User\'s role' })
      @IsOptional()
      @IsEnum(UserRole)
      role?: UserRole;
    
      @ApiProperty({ example: 'Tashkent', description: 'User\'s region ID' })
      @IsOptional()
      @IsString()
      regionID: string;
    
      @ApiProperty({ example: 'Tashkent, Uzbekistan', description: 'User\'s location' })
      @IsOptional()
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
