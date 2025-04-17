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

export class CreateOrderItemDto {
  @ApiProperty({ description: 'The order ID related to the order item', example: 'order-12345' })
  @IsString()
  @IsNotEmpty()
  orderID?: string;

  @ApiProperty({ description: 'The product ID related to the order item', example: 'prod-12345' })
  @IsString()
  @IsNotEmpty()
  productID?: string;

  @ApiProperty({ description: 'The tool ID related to the order item', example: 'tool-67890' })
  @IsString()
  @IsNotEmpty()
  toolID?: string;

  @ApiProperty({ description: 'The level ID related to the order item', example: 'level-111' })
  @IsString()
  @IsNotEmpty()
  levelID?: string;

  @ApiProperty({ description: 'Time unit for the order item (e.g., hours, days)', example: 2 })
  @IsInt()
  @Min(1)
  timeUnit?: number;

  @ApiProperty({ description: 'The quantity of the product for this order item', example: 10 })
  @IsInt()
  @Min(0)
  countOfProduct: number;

  @ApiProperty({ description: 'The quantity of the tool for this order item', example: 10 })
  @IsInt()
  @Min(0)
  countOfTool: number;

  @ApiProperty({ description: 'The working hours for this order item', example: 15 })
  @IsInt()
  @Min(0)
  workingHours: number;

  @ApiProperty({ description: 'The total price for this order item, optional field', example: 200, required: false })
  @IsInt()
  @IsOptional()
  totalPrice?: number;
}
