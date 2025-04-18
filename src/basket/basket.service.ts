import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('baskets')
@Injectable()
export class BasketService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new basket item' })
  @ApiBody({ type: CreateBasketDto })
  @ApiResponse({
    status: 201,
    description: 'The basket item has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Level or Tool not linked to the selected product.',
  })
  async create(createBasketDto: CreateBasketDto, userId: string) {
    let checkLevel = await this.prisma.product.findFirst({
      where: {
        id: createBasketDto.productID,
        levels: { some: { levelID: createBasketDto.levelID } },
      },
    });
    if (!checkLevel) {
      throw new BadRequestException(
        'This level is not linked to this product.',
      );
    }

    let checkTool = await this.prisma.product.findFirst({
      where: {
        id: createBasketDto.productID,
        tools: { some: { toolID: createBasketDto.toolID } },
      },
    });
    if (!checkTool) {
      throw new BadRequestException(
        'This tool is not linked to this product.',
      );
    }

    if(createBasketDto.timeUnit=='hour'&&createBasketDto.measure){
      throw new BadRequestException("When working hourly, the measure is not selected.")
    }

    let data = await this.prisma.basket.create({
      data: { ...createBasketDto, userID: userId },
    });
    return  data ;
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
  @ApiResponse({
    status: 200,
    description: 'The basket item with the given ID.',
  })
  @ApiResponse({ status: 400, description: 'Basket not found.' })
  async findOne(id: string) {
    let isBasketExists = await this.prisma.basket.findFirst({ where: { id } });
    if (!isBasketExists) {
      throw new BadRequestException('Basket not found');
    }
    return isBasketExists ;
  }

  @ApiOperation({ summary: 'Update a basket item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Basket ID' })
  @ApiBody({ type: UpdateBasketDto })
  @ApiResponse({
    status: 200,
    description: 'The basket item has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Basket not found.' })
  async update(id: string, updateBasketDto: UpdateBasketDto) {
    let isBasketExists = await this.prisma.basket.findFirst({ where: { id } });
    if (!isBasketExists) {
      throw new BadRequestException('Basket not found');
    }
    if(updateBasketDto.timeUnit=='hour'&&updateBasketDto.measure){
      throw new BadRequestException("When working hourly, the measure is not selected.")
    }
    let updatedBasket = await this.prisma.basket.update({
      where: { id },
      data: { ...updateBasketDto },
    });
    return  updatedBasket ;
  }

  @ApiOperation({ summary: 'Delete a basket item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Basket ID' })
  @ApiResponse({
    status: 200,
    description: 'The basket item has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Basket not found.' })
  async remove(id: string) {
    let isBasketExists = await this.prisma.basket.findFirst({ where: { id } });
    if (!isBasketExists) {
      throw new BadRequestException('Basket not found');
    }
    let deletedBasket = await this.prisma.basket.delete({ where: { id } });
    return  deletedBasket ;
  }
}
