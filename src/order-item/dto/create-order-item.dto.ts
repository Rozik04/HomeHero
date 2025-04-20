import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TimeUnit } from 'src/utils/enums';

export class CreateOrderItemDto {
  @ApiProperty({ example: 'product-uuid', description: 'Product ID' })
  @IsString()
  @IsNotEmpty()
  productID?: string;

  @ApiProperty({ example: 'tool-uuid', description: 'Tool ID' })
  @IsString()
  @IsNotEmpty()
  toolID?: string;

  @ApiProperty({ example: 'level-uuid', description: 'Level ID' })
  @IsString()
  @IsNotEmpty()
  levelID?: string;

  @ApiProperty({ enum: TimeUnit, example: 'day', description: 'Time unit for working hours' })
  @IsEnum(TimeUnit)
  timeUnit?: TimeUnit;

  @ApiProperty({ example: 1, description: 'Measure (optional)', required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  measure?: number;

  @ApiProperty({ example: 10, description: 'Count of product' })
  @IsInt()
  @Min(0)
  countOfProduct?: number;

  @ApiProperty({ example: 5, description: 'Count of tool' })
  @IsInt()
  @Min(0)
  countOfTool?: number;

  @ApiProperty({ example: 8, description: 'Working hours' })
  @IsInt()
  @Min(0)
  workingHours: number;

  @ApiProperty({ example: 800, description: 'Price' })
  @IsInt()
  @Min(0)
  price: number;
}
