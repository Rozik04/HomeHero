import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOtpDto {
  @ApiProperty({description: 'Email to which OTP will be sent',example: 'user@example.com'})
  @IsNotEmpty()
  @IsEmail()
  email: string;
}


export class verifyOtpDto {
    @ApiProperty({description: 'Email to which OTP has been sent',example: 'user@example.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'Otp code which has been sent',example: '124356'})
    @IsNotEmpty()
    @IsEmail()
    otp: string;
}

export class loginDto {
    @ApiProperty({description: 'Enter your email',example: 'user@example.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'Enter your password',example: 'password1234'})
    @IsNotEmpty()
    @IsEmail()
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
  