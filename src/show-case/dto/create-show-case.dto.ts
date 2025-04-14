import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export enum ShowCaseType {
    slider = 'slider',
    banner = 'banner',
    card = 'card',
  }
  
  export class CreateShowCaseDto {
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
  
    @IsString()
    @IsNotEmpty()
    image: string;
  
    @IsString()
    @IsNotEmpty()
    link: string;
  
    @IsEnum(ShowCaseType)
    @IsNotEmpty()
    type: ShowCaseType;
  
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
  
    @IsDateString()
    @IsOptional()
    startDate?: Date = new Date(); 
    
    @IsDateString()
    @IsNotEmpty()
    endDate: Date;
  }
  