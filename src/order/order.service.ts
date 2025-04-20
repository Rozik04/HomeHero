import {BadRequestException,Injectable,NotFoundException,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBody,} from '@nestjs/swagger';
import { CreateOrderWithItemsDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { BotService } from 'src/tgbot/tgbot.service'; 

@ApiTags('orders')
@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService,  private readonly botService: BotService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderWithItemsDto })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(dto: CreateOrderWithItemsDto, userId:string) {
    const {
      locationLat,
      locationLong,
      address,
      deliveryDate,
      paymentType,
      withDelivery,
      status,
      commentToDelivery,
      orderItems,
    } = dto;

    const createdOrder = await this.prisma.order.create({
      data: {
        locationLat,
        locationLong,
        address,
        deliveryDate: new Date(deliveryDate),
        paymentType,
        withDelivery,
        status,
        commentToDelivery,
        userID: userId
      },
    });

 
    
    for (const item of orderItems) {
      if (item.toolID && item.countOfTool) {
        await this.prisma.tool.update({
          where: { id: item.toolID },
          data: {
            quantity: {
              decrement: item.countOfTool,
            },
          },
        });
      }

      if(item.timeUnit=='hour'&&item.measure){
        throw new BadRequestException("When working hourly, the measure is not selected.")
      }


      await this.prisma.orderItem.create({
        data: {
          orderID: createdOrder.id,
          productID: item.productID,
          toolID: item.toolID,
          levelID: item.levelID,
          timeUnit: item.timeUnit,
          measure: item.measure||null,
          countOfProduct: item.countOfProduct,
          countOfTool: item.countOfTool,
          workingHours: item.workingHours,
          price: item.price,
          totalPrice:  null,
        },
      });
      await this.prisma.basket.deleteMany({where:{userID:userId}})
    }

    const message = `✅New order received!\n
    🆔 Order ID: ${createdOrder.id}
    🏠 Address: ${createdOrder.address}
    💳 Payment Type: ${createdOrder.paymentType}
    📊 With Delivery: ${createdOrder.withDelivery}
    📅 Delivery Date: ${createdOrder.deliveryDate}
    📦 Comment to Delivery: ${createdOrder.commentToDelivery}
    🌍 Location (Lat): ${createdOrder.locationLat}
    🌍 Location (Long): ${createdOrder.locationLong}
    👤 User ID: ${createdOrder.userID||userId}
    ⏱️ Created At: ${createdOrder.createdAt} \n
    
    🚚 Order successfully created and ready for processing! 📦✨
    `;
    
    
    
    await this.botService.sendMessage(message);

    return this.prisma.order.findUnique({
      where: { id: createdOrder.id },
      include: { items: true },
    });
  }

  
  async findAll(query: any) {
    const {
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = query;
  
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;
  
    const where = search
      ? {
          address: {
            contains: search,
            mode: Prisma.QueryMode.insensitive, 
          },
        }
      : {};
  
    const orders = await this.prisma.order.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take,
      include: {
        comments: {
          select: {
            user: { select: { id: true, nameUz: true } },
            message: true,
          },
        },
      },
    });
  
    const total = await this.prisma.order.count({ where });
  
    return {
      total,
      page: parseInt(page),
      limit: take,
      data: orders,
    };
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
    return isOrderExists;
  }

  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'orderID', type: String, description: 'Order ID' })
  @ApiBody({ type: CreateOrderWithItemsDto }) 
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async update(orderId: string, dto: CreateOrderWithItemsDto) {
    const {
      locationLat,
      locationLong,
      address,
      deliveryDate,
      paymentType,
      withDelivery,
      status,
      commentToDelivery,
      orderItems,
    } = dto;
  
    await this.prisma.orderItem.deleteMany({
      where: { orderID: orderId },
    });

    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        locationLat,
        locationLong,
        address,
        deliveryDate: new Date(deliveryDate),
        paymentType,
        withDelivery,
        status,
        commentToDelivery,
      },
    });
  
    for (const item of orderItems) {
      const {
        productID,
        toolID,
        levelID,
        timeUnit,
        countOfProduct,
        countOfTool,
        workingHours,
        price,
      } = item;
  
      if (toolID && countOfTool) {
        await this.prisma.tool.update({
          where: { id: toolID },
          data: {
            quantity: {
              decrement: countOfTool,
            },
          },
        });
      }
  
      await this.prisma.orderItem.create({
        data: {
          orderID: orderId,
          productID,
          toolID,
          levelID,
          timeUnit,
          countOfProduct,
          countOfTool,
          workingHours,
          totalPrice: null,
          price,
        },
      });
    }
  
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });
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
    return  deletedOrder ;
  }
}
