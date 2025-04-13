import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterJobDto } from './create-master-job.dto';

export class UpdateMasterJobDto extends PartialType(CreateMasterJobDto) {}
