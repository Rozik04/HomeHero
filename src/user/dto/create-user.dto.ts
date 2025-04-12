import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsEnum } from 'class-validator';
import { UserRole } from 'src/utils/enums';  

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nameRu: string;

  @IsNotEmpty()
  @IsString()
  nameUz: string;

  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  phone: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  regionID: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
