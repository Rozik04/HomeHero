import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsISO8601,
  IsEnum,
  IsInt,
  Min,
  ValidateNested,
  IsArray
} from 'class-validator';

export class CreateOrderItemDto {
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
  count: number;

  @IsInt()
  @Min(0)
  workingHours: number; 

  @IsInt()
  @IsOptional()
  totalPrice?: number;

}
