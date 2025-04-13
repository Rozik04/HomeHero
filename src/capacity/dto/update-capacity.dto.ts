import { PartialType } from '@nestjs/mapped-types';
import { CreateCapacityDto } from './create-capacity.dto';

export class UpdateCapacityDto extends PartialType(CreateCapacityDto) {}
