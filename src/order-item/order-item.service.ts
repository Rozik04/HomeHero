import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('order-items')
@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create order items' })
  @ApiBody({ type: [CreateOrderItemDto] })
  @ApiResponse({ status: 201, description: 'The order items have been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid product, level, or tool information.' })
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
          `This levelID is not linked to ProductID: ${item.productID}`
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
          `This toolID is not linked to ProductID: ${item.productID}`
        );
      }
    }

    const createdItems = await this.prisma.orderItem.createMany({
      data: items.map((item) => ({
        orderID,
        productID: item.productID,
        toolID: item.toolID,
        levelID: item.levelID,
        timeUnit: item.timeUnit,
        count: item.count,
        workingHours: item.workingHours,
      })),
    });

    return createdItems;
  }

  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({ status: 200, description: 'List of all order items.' })
  @ApiResponse({ status: 400, description: 'No order items found.' })
  async findAll() {
    return await this.prisma.orderItem.findMany();
  }

  @ApiOperation({ summary: 'Get an order item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Order Item ID' })
  @ApiResponse({ status: 200, description: 'The order item with the given ID.' })
  @ApiResponse({ status: 400, description: 'Order item not found.' })
  async findOne(id: string) {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });

    if (!orderItem) {
      throw new BadRequestException(`OrderItem not found`);
    }

    return orderItem;
  }

  @ApiOperation({ summary: 'Update an order item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Order Item ID' })
  @ApiBody({ type: UpdateOrderItemDto })
  @ApiResponse({ status: 200, description: 'The order item has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Order item not found.' })
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

  @ApiOperation({ summary: 'Delete an order item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Order Item ID' })
  @ApiResponse({ status: 200, description: 'The order item has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Order item not found.' })
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
