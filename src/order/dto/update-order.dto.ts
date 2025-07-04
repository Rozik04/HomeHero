import {
    IsString,
    IsNotEmpty,
    IsBoolean,
    IsOptional,
    IsISO8601,
    IsEnum,
    ValidateNested,
    IsArray,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import { OrderStatus, PaymentType } from 'src/utils/enums';
  import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
import { UpdateOrderItemDto } from 'src/order-item/dto/update-order-item.dto';
  
  export class UpdateOrderDto {
    @ApiProperty({
      description: 'Latitude of the order location',
      example: '41.311081',
    })
    @IsString()
    @IsNotEmpty()
    locationLat: string;
  
    @ApiProperty({
      description: 'Longitude of the order location',
      example: '69.240562',
    })
    @IsString()
    @IsNotEmpty()
    locationLong: string;
  
    @ApiProperty({
      description: 'Delivery address',
      example: 'Yunusobod district, 19th kvartal',
    })
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @ApiProperty({
      description: 'Delivery date in ISO 8601 format',
      example: '2025-04-20T15:30:00.000Z',
    })
    @IsISO8601()
    @IsNotEmpty()
    deliveryDate: string;
  
    @ApiProperty({
      description: 'Payment type',
      enum: PaymentType,
      example: PaymentType.cash,
    })
    @IsEnum(PaymentType)
    @IsNotEmpty()
    paymentType: PaymentType;
  
    @ApiProperty({
      description: 'Whether the order includes delivery or not',
      example: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    withDelivery: boolean;
  
    @ApiProperty({
      description: 'Order status',
      enum: OrderStatus,
      example: OrderStatus.pending,
    })
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;
  
    @ApiPropertyOptional({
      description: 'Optional comment for the delivery person',
      example: 'Please call 5 minutes before arrival',
    })
    @IsString()
    @IsOptional()
    commentToDelivery?: string;
  
    @ApiProperty({
      description: 'List of order items',
      type: [UpdateOrderItemDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateOrderItemDto)
    @IsNotEmpty()
    orderItems: UpdateOrderItemDto[];
  }
  