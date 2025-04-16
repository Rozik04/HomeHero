import {
    IsBoolean,
    IsDecimal,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
  } from 'class-validator';
import { Decimal } from 'generated/prisma/runtime/library';
  
  export class CreateMasterDto {
    @IsString()
    @IsNotEmpty()
    nameRu: string;
  
    @IsString()
    @IsNotEmpty()
    nameUz: string;
  
    @IsString()
    @IsNotEmpty()
    nameEn: string;
  
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
  
    @IsString()
    @IsNotEmpty()
    phone: string;
  
    @IsString()
    @IsNotEmpty()
    dob: string;
  
    @IsString()
    @IsNotEmpty()
    image: string;
  
    @IsString()
    @IsNotEmpty()
    passportImage: string;
  
    @IsDecimal()
    @IsOptional()
    rating?: Decimal;
  
  }
  