import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGeneralInfoDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
