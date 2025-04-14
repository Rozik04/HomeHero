import { PartialType } from '@nestjs/mapped-types';
import { CreateShowCaseDto } from './create-show-case.dto';

export class UpdateShowCaseDto extends PartialType(CreateShowCaseDto) {}
