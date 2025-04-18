import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('FAQs')
@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new FAQ' })
  @ApiBody({ type: CreateFaqDto })
  @ApiResponse({ status: 201, description: 'FAQ successfully created.' })
  @ApiResponse({ status: 400, description: 'FAQ was not created.' })
  async create(createFaqDto: CreateFaqDto) {
    let data = await this.prisma.fAQ.create({ data: { ...createFaqDto } });
    return  data ;
  }

  @ApiOperation({ summary: 'Get all FAQs' })
  @ApiResponse({ status: 200, description: 'List of all FAQs.' })
  @ApiResponse({ status: 400, description: 'No FAQs found.' })
  async findAll() {
    let allData = await this.prisma.fAQ.findMany();
    return allData ;
  }

  @ApiOperation({ summary: 'Get a FAQ by ID' })
  @ApiParam({ name: 'id', type: String, description: 'FAQ ID' })
  @ApiResponse({ status: 200, description: 'FAQ found.' })
  @ApiResponse({ status: 400, description: 'FAQ not found.' })
  async findOne(id: string) {
    let isFaqExists = await this.prisma.fAQ.findFirst({ where: { id } });
    if (!isFaqExists) {
      throw new BadRequestException('FAQ not found');
    }
    return  isFaqExists ;
  }

  @ApiOperation({ summary: 'Update a FAQ by ID' })
  @ApiParam({ name: 'id', type: String, description: 'FAQ ID' })
  @ApiBody({ type: UpdateFaqDto })
  @ApiResponse({ status: 200, description: 'FAQ successfully updated.' })
  @ApiResponse({ status: 400, description: 'FAQ not found.' })
  async update(id: string, updateFaqDto: UpdateFaqDto) {
    let isFaqExists = await this.prisma.fAQ.findFirst({ where: { id } });
    if (!isFaqExists) {
      throw new BadRequestException('FAQ not found');
    }
    let updatedFaq = await this.prisma.fAQ.update({
      where: { id },
      data: { ...updateFaqDto },
    });
    return  updatedFaq ;
  }

  @ApiOperation({ summary: 'Delete a FAQ by ID' })
  @ApiParam({ name: 'id', type: String, description: 'FAQ ID' })
  @ApiResponse({ status: 200, description: 'FAQ successfully deleted.' })
  @ApiResponse({ status: 400, description: 'FAQ not found.' })
  async remove(id: string) {
    let isFaqExists = await this.prisma.fAQ.findFirst({ where: { id } });
    if (!isFaqExists) {
      throw new BadRequestException('FAQ not found');
    }
    let deletedFaq = await this.prisma.fAQ.delete({ where: { id } });
    return deletedFaq ;
  }
}
