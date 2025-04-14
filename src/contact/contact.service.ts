import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    let data = await this.prisma.contact.create({ data: { ...createContactDto } });
    return { data };
  }

  async findAll() {
    let alldata = await this.prisma.contact.findMany();
    if (!alldata.length) {
      throw new BadRequestException("No contacts found");
    }
    return { alldata };
  }

  async findOne(id: string) {
    let isContactExists = await this.prisma.contact.findFirst({ where: { id } });
    if (!isContactExists) {
      throw new BadRequestException("Contact not found");
    }
    return { Contact: isContactExists };
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    let isContactExists = await this.prisma.contact.findFirst({ where: { id } });
    if (!isContactExists) {
      throw new BadRequestException("Contact not found");
    }
    let updatedContact = await this.prisma.contact.update({
      where: { id },
      data: { ...updateContactDto },
    });
    return { Updated: updatedContact };
  }

  async remove(id: string) {
    let isContactExists = await this.prisma.contact.findFirst({ where: { id } });
    if (!isContactExists) {
      throw new BadRequestException("Contact not found");
    }
    let deletedContact = await this.prisma.contact.delete({ where: { id } });
    return { Deleted: deletedContact };
  }
}
