import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { JwtAuthGuard } from 'src/utils/token.guard';
import { JwtRoleGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/role.decorator';
import { UserRole } from 'src/utils/enums';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Order Items')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post(':id')
  @ApiOperation({ summary: 'Create multiple order items by Order ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiBody({ type: [CreateOrderItemDto] })
  @ApiResponse({ status: 201, description: 'Order items created successfully' })
  async createOrderItems(
    @Param('id') orderID: string,
    @Body() items: CreateOrderItemDto[],
  ) {
    return await this.orderItemService.createOrderItems(orderID, items);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({ status: 200, description: 'List of all order items' })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order item by ID' })
  @ApiParam({ name: 'id', description: 'Order Item ID' })
  @ApiResponse({ status: 200, description: 'Order item found' })
  @ApiResponse({ status: 400, description: 'Order item not found' })
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order item by ID' })
  @ApiParam({ name: 'id', description: 'Order Item ID' })
  @ApiBody({ type: UpdateOrderItemDto })
  @ApiResponse({ status: 200, description: 'Order item updated' })
  @ApiResponse({ status: 400, description: 'Order item not found' })
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order item by ID' })
  @ApiParam({ name: 'id', description: 'Order Item ID' })
  @ApiResponse({ status: 200, description: 'Order item deleted' })
  @ApiResponse({ status: 400, description: 'Order item not found' })
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(id);
  }
}
