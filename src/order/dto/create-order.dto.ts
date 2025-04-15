
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
import { Type } from 'class-transformer';
import { OrderStatus, PaymentType } from 'src/utils/enums';

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


  @IsString()
  @IsOptional()
  product?: any;

  @IsString()
  @IsOptional()
  tool?: any;

  @IsString()
  @IsOptional()
  level?: any;
}

export class CreateOrderWithItemsDto {
  @IsString()
  @IsNotEmpty()
  locationLat: string;

  @IsString()
  @IsNotEmpty()
  locationLong: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsISO8601()
  @IsNotEmpty()
  deliveryDate: string;

  @IsEnum(PaymentType)
  @IsNotEmpty()
  paymentType: PaymentType;

  @IsBoolean()
  @IsNotEmpty()
  withDelivery: boolean;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  @IsString()
  @IsOptional()
  commentToDelivery?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
