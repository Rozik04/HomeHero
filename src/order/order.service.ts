import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderWithItemsDto, CreateOrderItemDto } from './dto/create-order.dto';
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
      items,
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
        items: {
          create: items.map((item: CreateOrderItemDto) => ({
            orderID: item.orderID,
            productID: item.productID,
            toolID: item.toolID,
            levelID: item.levelID,
            timeUnit: item.timeUnit,
            count: item.count,
            workingHours: item.workingHours,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return order;
  }

  async findAll() {
    let alldata = await this.prisma.order.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No orders found");
    }
    return { alldata };
  }

  async findOne(id: string) {
    let isOrderExists = await this.prisma.order.findFirst({ where: { id } });
    if (!isOrderExists) {
      throw new BadRequestException("Order not found");
    }
    return { Order: isOrderExists };
  }

  async update(id: string, updateOrderDto: CreateOrderWithItemsDto) {
  const {
    locationLat,
    locationLong,
    address,
    deliveryDate,
    paymentType,
    withDelivery,
    status,
    commentToDelivery,
    items,
  } = updateOrderDto;

  // 1. Oldingi itemslarni o'chirib tashlash
  await this.prisma.orderItem.deleteMany({
    where: {
      orderID: id,
    },
  });

  // 2. Orderni yangilash va yangi itemslarni qo‘shish
  const updatedOrder = await this.prisma.order.update({
    where: { id },
    data: {
      locationLat,
      locationLong,
      address,
      deliveryDate,
      paymentType,
      withDelivery,
      status,
      commentToDelivery,
      items: {
        create: items.map((item: CreateOrderItemDto) => ({
          productID: item.productID,
          toolID: item.toolID,
          levelID: item.levelID,
          timeUnit: item.timeUnit,
          count: item.count,
          workingHours: item.workingHours,
          totalPrice: item.totalPrice,
        })),
      },
    },
    include: {
      items: true,
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
