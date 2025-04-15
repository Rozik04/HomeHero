import {
    IsString,
    IsNotEmpty,
    IsInt,
    IsOptional,
    Min
  } from 'class-validator';
  
  export class CreateOrderItemDto {
    @IsString()
    @IsNotEmpty()
    orderID: string;
  
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
    quantity: number;
  
    @IsInt()
    @Min(0)
    toolCount: number;
  
    @IsInt()
    @Min(0)
    minWorkingHours: number;
  
    @IsString()
    @IsNotEmpty()
    measure: string;
  
    @IsInt()
    @IsOptional()
    totalPrice?: number;
  }
  