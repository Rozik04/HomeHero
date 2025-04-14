import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
  } from 'class-validator';
  
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
  
    @IsInt()
    @IsOptional()
    rating?: number;
  
    @IsUUID()
    @IsNotEmpty()
    masterJobsID: string;
  }
  