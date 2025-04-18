import { PartialType } from '@nestjs/swagger';
import { CreateOrderMasterDto } from './create-order-master.dto';

export class UpdateOrderMasterDto extends PartialType(CreateOrderMasterDto) {}
