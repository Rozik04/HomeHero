import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCapacityDto {
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
