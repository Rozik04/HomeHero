import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneralInfoDto } from './create-general-info.dto';

export class UpdateGeneralInfoDto extends PartialType(CreateGeneralInfoDto) {}
