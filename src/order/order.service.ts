import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateOrderWithItemsDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('orders')
@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderWithItemsDto })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
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
  
    return order;
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders.' })
  @ApiResponse({ status: 400, description: 'No orders found.' })
  async findAll() {
    let alldata = await this.prisma.order.findMany({
      include: {
        comments: {
          select: {
            user: { select: { id: true, nameUz: true } },
            message: true,
          },
        },
      },
    });
    if (!alldata.length) {
      throw new BadRequestException('No orders found');
    }
    return { alldata };
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'The order with the given ID.' })
  @ApiResponse({ status: 400, description: 'Order not found.' })
  async findOne(id: string) {
    let isOrderExists = await this.prisma.order.findFirst({
      where: { id },
      include: {
        comments: {
          select: {
            user: { select: { id: true, nameUz: true } },
            message: true,
          },
        },
      },
    });
    if (!isOrderExists) {
      throw new BadRequestException('Order not found');
    }
    return { Order: isOrderExists };
  }

  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'orderID', type: String, description: 'Order ID' })
  @ApiBody({ type: CreateOrderWithItemsDto }) // yoki UpdateOrderDto bo'lsa, o'shani kiriting
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
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

  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'The order has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Order not found.' })
  async remove(id: string) {
    let isOrderExists = await this.prisma.order.findFirst({ where: { id } });
    if (!isOrderExists) {
      throw new BadRequestException('Order not found');
    }
    let deletedOrder = await this.prisma.order.delete({ where: { id } });
    return { Deleted: deletedOrder };
  }
}
