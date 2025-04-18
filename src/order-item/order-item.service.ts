import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}


  async createOrderItems(orderID: string, items: CreateOrderItemDto[]) {
    for (const item of items) {
      const checkLevel = await this.prisma.product.findFirst({
        where: {
          id: item.productID,
          levels: { some: { levelID: item.levelID } },
        },
      });

      if (!checkLevel) {
        throw new BadRequestException(
          `This levelID is not linked to this Product`
        );
      }

      const checkTool = await this.prisma.product.findFirst({
        where: {
          id: item.productID,
          tools: { some: { toolID: item.toolID } },
        },
      });

      if (!checkTool) {
        throw new BadRequestException(
          `This toolID is not linked to this Product`
        );
      }
    

    const tool = await this.prisma.tool.findUnique({
      where: { id: item.toolID },
    });

    if (!tool) {
      throw new BadRequestException(`Tool with ID ${item.toolID} not found`);
    }

    if (item.countOfTool&&tool.quantity < item.countOfTool) {
      throw new BadRequestException(
        `Not enough tools available for this toolID. Required: ${item.countOfTool}, Available: ${tool.quantity}`
      );
    }
    await this.prisma.tool.update({
      where: { id: item.toolID },
      data: {
        quantity: {
          decrement: item.countOfTool,
        },
      },
    });
  }

  
    const createdItems = await this.prisma.orderItem.createMany({
      data: items.map((item) => ({
        orderID,
        productID: item.productID,
        toolID: item.toolID,
        levelID: item.levelID,
        timeUnit: item.timeUnit,
        countOfProduct: item.countOfProduct,
        countOfTool: item.countOfTool,
        workingHours: item.workingHours,
      })),
    });
  
    return createdItems;
  }

  async findAll() {
    return await this.prisma.orderItem.findMany();
  }

  async findOne(id: string) {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });

    if (!orderItem) {
      throw new BadRequestException(`OrderItem not found`);
    }

    return orderItem;
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const existingOrderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });

    if (!existingOrderItem) {
      throw new BadRequestException(`OrderItem with id ${id} not found`);
    }


    const updatedOrderItem = await this.prisma.orderItem.update({
      where: { id },
      data: updateOrderItemDto,
    });

    return updatedOrderItem;
  }

  async remove(id: string) {
    const existingOrderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });

    if (!existingOrderItem) {
      throw new BadRequestException(`OrderItem with id ${id} not found`);
    }

    await this.prisma.orderItem.delete({
      where: { id },
    });

    return { message: `OrderItem with id ${id} removed successfully` };
  }
}
