import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterJobDto } from './create-master-job.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMasterJobDto extends PartialType(CreateMasterJobDto) {
    @ApiPropertyOptional({ description: 'UUID of the tool used by the master', example: 'tool-uuid-1234' })
    @IsString()
    @IsOptional()
    toolID?: string;
  
    @ApiPropertyOptional({ description: 'Minimum working hours required', example: 2 })
    @IsInt()
    @IsOptional()
    minWorkingHour?: number;
  
    @ApiPropertyOptional({ description: 'Total working hours', example: 5 })
    @IsInt()
    @IsOptional()
    workingHours?: number;
  
    @ApiPropertyOptional({ description: 'UUID of the associated level', example: 'level-uuid-5678' })
    @IsString()
    @IsOptional()
    levelID?: string;
  
    @ApiPropertyOptional({ description: 'UUID of the product associated with this job', example: 'product-uuid-9012' })
    @IsString()
    @IsOptional()
    productID?: string;
  
    @ApiPropertyOptional({ description: 'Hourly price for this job', example: 25000 })
    @IsInt()
    @IsOptional()
    priceHourly?: number;
  
    @ApiPropertyOptional({ description: 'Daily price for this job', example: 100000 })
    @IsInt()
    @IsOptional()
    priceDaily?: number;
  
    @ApiPropertyOptional({ description: 'Master’s experience description', example: '3 years experience in electrical tools' })
    @IsString()
    @IsOptional()
    experience?: string;
  
    @ApiPropertyOptional({ description: 'UUID of the master', example: 'master-uuid-3456' })
    @IsUUID()
    @IsOptional()
    masterID?: string;
}
