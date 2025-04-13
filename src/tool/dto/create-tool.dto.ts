import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateToolDto {
  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @IsString()
  @IsNotEmpty()
  nameUz: string;

  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @IsString()
  @IsNotEmpty()
  descriptionRu: string;

  @IsString()
  @IsNotEmpty()
  descriptionUz: string;

  @IsString()
  @IsNotEmpty()
  descriptionEn: string;

  @IsInt()
  price: number;

  @IsInt()
  quantity: number;

  @IsOptional()
  @IsString()
  code?: string;

  @IsString()
  @IsNotEmpty()
  brandID: string;

  @IsString()
  @IsNotEmpty()
  capacityID: string;

  @IsString()
  @IsNotEmpty()
  sizeID: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  levelID: string;
}
