import {BadRequestException, Injectable,} from '@nestjs/common';
import { CreateBasketArrayDto, CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketArrayDto, UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody} from '@nestjs/swagger';

@ApiTags('baskets')
@Injectable()
export class BasketService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new basket item' })
  @ApiBody({ type: CreateBasketArrayDto })
  @ApiResponse({status: 201, description: 'The basket item has been successfully created.', })
  @ApiResponse({status: 400, description: 'Level or Tool not linked to the selected product.',})
  async create(CreateBasketArrayDto: CreateBasketArrayDto, userId: string) {
    let itemsToSave: any[] = [];
  
    for (const dto of CreateBasketArrayDto.baskets) {
      const checkLevel = await this.prisma.product.findFirst({
        where: {
          id: dto.productID,
          levels: { some: { levelID: dto.levelID } },
        },
      });
      if (!checkLevel) {
        throw new BadRequestException(
          `This level is not linked to product`,
        );
      }
  
      const checkTool = await this.prisma.product.findFirst({
        where: {
          id: dto.productID,
          tools: { some: { toolID: dto.toolID } },
        },
      });
      if (!checkTool) {
        throw new BadRequestException(
          `This tool is not linked to product`,
        );
      }
  
      if (dto.timeUnit == 'hour' && dto.measure) {
        throw new BadRequestException(
          'When working hourly, the measure should not be selected.',
        );
      }
      itemsToSave.push({ ...dto, userID: userId });
    }
    const basketItems = await this.prisma.basket.createMany({
      data: itemsToSave,
    });
    return  basketItems.count
  }

  
  @ApiOperation({ summary: 'Get all basket items' })
  @ApiResponse({ status: 200, description: 'List of all basket items.' })
  @ApiResponse({ status: 400, description: 'No baskets found.' })
  async findAll() {
    let alldata = await this.prisma.basket.findMany();

    return  alldata ;
  }


  @ApiOperation({ summary: 'Get a basket item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Basket ID' })
  @ApiResponse({status: 200, description: 'The basket item with the given ID.',})
  @ApiResponse({ status: 400, description: 'Basket not found.' })
  async findOne(id: string, userId:string, role:string) {
    const basket = await this.prisma.basket.findFirst({ where: { id } });

    if (!basket) {
      throw new BadRequestException('Basket not found');
    }
      const allowedRoles = ['admin', 'superadmin'];
  
    if (basket.userID === userId || allowedRoles.includes(role)) {
      return basket;
    } else {
      throw new BadRequestException('Not allowed!');
    }
  }

  @ApiOperation({ summary: 'Update basket items' })
  @ApiBody({ type: UpdateBasketArrayDto })
  @ApiResponse({ status: 200, description: 'Basket items successfully updated.' })
  @ApiResponse({ status: 400, description: 'Level or Tool not linked to the selected product.' })
  async update(UpdateBasketArrayDto: UpdateBasketArrayDto, userId: string, role:string) {
     for(const dto of UpdateBasketArrayDto.baskets){
      const allowedRoles = ['admin', 'superadmin'];
      if (dto.userID !== userId || !allowedRoles.includes(role)) {
        throw new BadRequestException('Not allowed!');
      }}
    const updatedItems: any[] = [];
  
    for (const dto of UpdateBasketArrayDto.baskets) {
      const existingItem = await this.prisma.basket.findUnique({
        where: { id: dto.id },
      });
  
      if (!existingItem) {
        throw new BadRequestException(`Basket item with ID ${dto.id} not found.`);
      }
  
      if (dto.productID && dto.levelID) {
        const checkLevel = await this.prisma.product.findFirst({
          where: {
            id: dto.productID,
            levels: { some: { levelID: dto.levelID } },
          },
        });
        if (!checkLevel) {
          throw new BadRequestException(
            `This level is not linked to product with ID ${dto.productID}`,
          );
        }
      }
  
      if (dto.productID && dto.toolID) {
        const checkTool = await this.prisma.product.findFirst({
          where: {
            id: dto.productID,
            tools: { some: { toolID: dto.toolID } },
          },
        });
        if (!checkTool) {
          throw new BadRequestException(
            `This tool is not linked to product with ID ${dto.productID}`,
          );
        }
      }
  
      if (dto.timeUnit === 'hour' && dto.measure) {
        throw new BadRequestException(
          'When working hourly, the measure should not be selected.',
        );
      }
  
      const updated = await this.prisma.basket.update({
        where: { id: dto.id },
        data: {
          productID: dto.productID ?? existingItem.productID,
          toolID: dto.toolID ?? existingItem.toolID,
          levelID: dto.levelID ?? existingItem.levelID,
          timeUnit: dto.timeUnit ?? existingItem.timeUnit,
          countOfTool: dto.countOfTool ?? existingItem.countOfTool,
          measure: dto.measure ?? existingItem.measure,
          countOfProduct: dto.countOfProduct ?? existingItem.countOfProduct,
          dailyPrice: dto.dailyPrice ?? existingItem.dailyPrice,
          hourlyPrice: dto.hourlyPrice ?? existingItem.hourlyPrice,
          workingHours: dto.workingHours ?? existingItem.workingHours,
          userID: userId,
        },
      });
  
      updatedItems.push(updated);
    }
  
    return updatedItems;
  }
  
  
  @ApiOperation({ summary: 'Delete a basket item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Basket ID' })
  @ApiResponse({ status: 200, description: 'The basket item has been successfully deleted.',})
  @ApiResponse({ status: 400, description: 'Basket not found.' })
  async remove(id: string, userId:string, role:string) {
    let isBasketExists = await this.prisma.basket.findFirst({ where: { id } });
    if (!isBasketExists) {
      throw new BadRequestException('Basket not found');
    }
    const allowedRoles = ['admin'];
    if (isBasketExists.userID !== userId || !allowedRoles.includes(role)) {
      throw new BadRequestException('Not allowed!');
    }
    let deletedBasket = await this.prisma.basket.delete({ where: { id } });
    return  deletedBasket ;
  }
}
