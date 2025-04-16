import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderWithItemsDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderWithItemsDto) {
    const {
      locationLat,
      locationLong,
      address,
      deliveryDate,
      paymentType,
      withDelivery,
      status,
      commentToDelivery,
    } = createOrderDto;
  
    const order = await this.prisma.order.create({
      data: {
        locationLat,
        locationLong,
        address,
        deliveryDate,
        paymentType,
        withDelivery,
        status,
        commentToDelivery,
      },
    });
  
    return order; // Bu yerda order.id ni controllerda ishlatish uchun qaytarish mumkin
  }
  
  async findAll() {
    let alldata = await this.prisma.order.findMany({include:{comments:{select:{user:{select:{id:true, nameUz:true}},message:true}}}});
    if (!alldata.length) {
      throw new BadRequestException("No orders found");
    }
    return { alldata };
  }

  async findOne(id: string) {
    let isOrderExists = await this.prisma.order.findFirst({ where:{id}, include:{comments:{select:{user:{select:{id:true, nameUz:true}},message:true}}}});
    if (!isOrderExists) {
      throw new BadRequestException("Order not found");
    }
    return { Order: isOrderExists };
  }

  async update(orderID: string, updateOrderDto: Partial<CreateOrderWithItemsDto>) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id: orderID },
    });
  
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${orderID} not found`);
    }
  
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderID },
      data: {
        locationLat: updateOrderDto.locationLat,
        locationLong: updateOrderDto.locationLong,
        address: updateOrderDto.address,
        deliveryDate: updateOrderDto.deliveryDate,
        paymentType: updateOrderDto.paymentType,
        withDelivery: updateOrderDto.withDelivery,
        status: updateOrderDto.status,
        commentToDelivery: updateOrderDto.commentToDelivery,
      },
    });
  
    return updatedOrder;
  }
  
  async remove(id: string) {
    let isOrderExists = await this.prisma.order.findFirst({ where: { id } });
    if (!isOrderExists) {
      throw new BadRequestException("Order not found");
    }
    let deletedOrder = await this.prisma.order.delete({ where: { id } });
    return { Deleted: deletedOrder };
  }
}
