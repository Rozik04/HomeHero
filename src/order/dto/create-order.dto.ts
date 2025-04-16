
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
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
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


}
