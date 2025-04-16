import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('contacts')
@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new contact' })
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({ status: 201, description: 'The contact has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(createContactDto: CreateContactDto) {
    let data = await this.prisma.contact.create({ data: { ...createContactDto } });
    return { data };
  }

  @ApiOperation({ summary: 'Get all contacts' })
  @ApiResponse({ status: 200, description: 'List of all contacts.' })
  @ApiResponse({ status: 400, description: 'No contacts found.' })
  async findAll() {
    let alldata = await this.prisma.contact.findMany();
    if (!alldata.length) {
      throw new BadRequestException('No contacts found');
    }
    return { alldata };
  }

  @ApiOperation({ summary: 'Get a contact by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Contact ID' })
  @ApiResponse({ status: 200, description: 'The contact with the given ID.' })
  @ApiResponse({ status: 400, description: 'Contact not found.' })
  async findOne(id: string) {
    let isContactExists = await this.prisma.contact.findFirst({ where: { id } });
    if (!isContactExists) {
      throw new BadRequestException('Contact not found');
    }
    return { Contact: isContactExists };
  }

  @ApiOperation({ summary: 'Update a contact by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Contact ID' })
  @ApiBody({ type: UpdateContactDto })
  @ApiResponse({ status: 200, description: 'The contact has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Contact not found.' })
  async update(id: string, updateContactDto: UpdateContactDto) {
    let isContactExists = await this.prisma.contact.findFirst({ where: { id } });
    if (!isContactExists) {
      throw new BadRequestException('Contact not found');
    }
    let updatedContact = await this.prisma.contact.update({
      where: { id },
      data: { ...updateContactDto },
    });
    return { Updated: updatedContact };
  }

  @ApiOperation({ summary: 'Delete a contact by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Contact ID' })
  @ApiResponse({ status: 200, description: 'The contact has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Contact not found.' })
  async remove(id: string) {
    let isContactExists = await this.prisma.contact.findFirst({ where: { id } });
    if (!isContactExists) {
      throw new BadRequestException('Contact not found');
    }
    let deletedContact = await this.prisma.contact.delete({ where: { id } });
    return { Deleted: deletedContact };
  }
}
