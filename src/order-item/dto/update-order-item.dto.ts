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
  
  export class UpdateOrderItemDto {
    @ApiProperty({ description: 'The product ID related to the order item', example: 'prod-12345', required: false })
    @IsString()
    @IsOptional()
    productID?: string;
  
    @ApiProperty({ description: 'The tool ID related to the order item', example: 'tool-67890', required: false })
    @IsString()
    @IsOptional()
    toolID?: string;
  
    @ApiProperty({ description: 'The level ID related to the order item', example: 'level-111', required: false })
    @IsString()
    @IsOptional()
    levelID?: string;
  
    @ApiProperty({ description: 'Time unit for the order item (e.g., hours, days)', example: 2, required: false })
    @IsInt()
    @Min(1)
    @IsOptional()
    timeUnit?: number;
  
    @ApiProperty({ description: 'The quantity of the product for this order item', example: 10, required: false })
    @IsInt()
    @Min(0)
    @IsOptional()
    count?: number;
  
    @ApiProperty({ description: 'The working hours for this order item', example: 15, required: false })
    @IsInt()
    @Min(0)
    @IsOptional()
    workingHours?: number;
  
    @ApiProperty({ description: 'The total price for this order item, optional field', example: 200, required: false })
    @IsInt()
    @IsOptional()
    totalPrice?: number;
  }
  