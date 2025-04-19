import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from 'src/utils/enums';

export class CreateAdminDto {
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
}




export class CreateOtpDto {
  @ApiProperty({description: 'Email to which OTP will be sent',example: 'yusupovruzimuhammad4@gmail.com'})
  @IsNotEmpty()
  @IsEmail()
  email: string;
}


export class RefreshTokenDto {
    @ApiProperty({description: 'Refresh token',example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYTI3YTFhNC0zMzZiLTRjZTktYjMzZS1iNDIxOGJjZDJkM2MiLCJyb2xlIjoibGVnYWx1c2VyIiwiaWF0IjoxNzQ1MDgzNTQzLCJleHAiOjE3NDUwODQ0NDN9.k2XI_jFtQVhwRJaEU1yD6H70I5d2dyWvnPudszBUDvk'})
    @IsString()
    refreshToken: string;
  }


export class verifyOtpDto {
    @ApiProperty({description: 'Email to which OTP has been sent',example: 'yusupovruzimuhammad4@gmail.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'Otp code which has been sent',example: '124356'})
    @IsNotEmpty()
    @IsEmail()
    otp: string;
}

export class loginDto {
    @ApiProperty({description: 'Enter your email',example: 'yusupovruzimuhammad4@gmail.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'Enter your password',example: 'password1234'})
    @IsNotEmpty()
    password: string;
}

export class otpToResetPassword{
        @ApiProperty({description: 'Otp code which has been sent to reset password',example: '124356'})
        @IsNotEmpty()
        @IsEmail()
        otp: string;
}

export class newPasswordDto{
    @ApiProperty({description: 'Enter your new password',example: 'password1234'})
    @IsNotEmpty()
    @IsEmail()
    newPassword: string;
}
  