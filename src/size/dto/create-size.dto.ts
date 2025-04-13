import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  nameRu: string;

  @IsNotEmpty()
  @IsString()
  nameUz: string;

  @IsNotEmpty()
  @IsString()
  nameEn: string;
}