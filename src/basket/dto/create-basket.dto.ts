import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsInt,
    Min
  } from 'class-validator';
  
  export class CreateBasketDto {
    @IsString()
    @IsOptional()
    userID?: string;
  
    @IsString()
    @IsNotEmpty()
    productID: string;
  
    @IsString()
    @IsNotEmpty()
    toolID: string;
  
    @IsString()
    @IsNotEmpty()
    levelID: string;
  
    @IsInt()
    @Min(1)
    timeUnit: number;
  
    @IsInt()
    @Min(0)
    @IsOptional()
    count?: number;
  
    @IsInt()
    @Min(0)
    workingHours: number;
  
    @IsInt()
    @IsOptional()
    totalPrice?: number;
  }
  