import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
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
  image: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsArray()
  @IsUUID('all', { each: true })
  levelIDs: string[];

  @IsArray()
  @IsUUID('all', { each: true })
  toolIDs: string[];
}
