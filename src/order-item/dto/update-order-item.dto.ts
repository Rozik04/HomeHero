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
  import { ApiProperty } from '@nestjs/swagger';
import { TimeUnit } from 'src/utils/enums';
  
  export class UpdateOrderItemDto {
    @IsString()
    @IsOptional()
    productID?: string;
  
    @IsString()
    @IsOptional()
    toolID?: string;
  
    @IsString()
    @IsOptional()
    levelID?: string;
  

  @IsEnum(TimeUnit)
  @Min(1)
  timeUnit?: TimeUnit;



  @IsInt()
  @Min(0)
  @IsOptional()
  measure?: number;
  
    @IsInt()
    @Min(0)
    countOfProduct?: number;
  
    @IsInt()
    @Min(0)
    countOfTool?: number;
  
    @IsInt()
    @Min(0)
    @IsOptional()
    workingHours?: number;
  
  }
  