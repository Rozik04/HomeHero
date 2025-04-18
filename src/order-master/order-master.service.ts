import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderMasterDto } from './dto/create-order-master.dto';
import { UpdateOrderMasterDto } from './dto/update-order-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Order-Master')
@Injectable()
export class OrderMasterService {
  constructor(private readonly prisma:PrismaService){}

  @ApiOperation({ summary: 'Buyurtmaga mos ustalarni biriktirish' })
  @ApiBody({ type: CreateOrderMasterDto })
  @ApiResponse({status: 201, description: 'Ustalar muvaffaqiyatli biriktirildi',
    schema: {example:{createdOrderMasters:[{
    id: 'uuid', orderID: 'uuid', masterID: 'uuid',},],},},})
  @ApiResponse({ status: 400, description: 'Order not found' })
    async create(createOrderMasterDto: CreateOrderMasterDto) {
  const { orderId } = createOrderMasterDto;

  const order = await this.prisma.order.findFirst({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    throw new BadRequestException("Order not found");
  }

  let createdOrderMasters: any[] = [];

  for (const item of order.items) {
    const searchConditions: any = {};

    if (item.productID) {
      searchConditions.productID = item.productID;
    }

    if (item.toolID) {
      searchConditions.toolID = item.toolID;
    }

    if (item.levelID) {
      searchConditions.levelID = item.levelID;
    }

    if (typeof item.workingHours === "number") {
      searchConditions.workingHours = item.workingHours;
    }
    if (Object.keys(searchConditions).length === 0) {
      continue;
    }

    const suitableMasters = await this.prisma.masterJobs.findMany({
      where: searchConditions,
      include: { master: true },
    });

    for (const job of suitableMasters) {
      const created = await this.prisma.oderMaster.create({
        data: {
          orderID: order.id,
          masterID: job.masterID
        },
      });
      await this.prisma.master.update({where:{id:job.masterID},data:{isActive:false}});
      createdOrderMasters.push(created);
    }
    if(createdOrderMasters.length){
      await this.prisma.order.update({where:{id:order.id},data:{status:'accepted'}});
    }
    else{
      throw new BadRequestException("There are currently no masters that meet these requirements.")
    }
  }


  return {
    createdOrderMasters,
  };
    }


  @ApiOperation({ summary: 'Get all pending accepted orders' })
  @ApiResponse({ status: 200, description: 'List of all accepted orders.' })
  @ApiResponse({ status: 400, description: 'No accepted orders found.' })
  async findAll() {
    let allData = await this.prisma.oderMaster.findMany();
    return allData ;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderMaster`;
  }

  update(id: number, updateOrderMasterDto: UpdateOrderMasterDto) {
    return `This action updates a #${id} orderMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderMaster`;
  }
}
