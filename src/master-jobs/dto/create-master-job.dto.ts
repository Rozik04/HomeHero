import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterJobDto {
  @ApiProperty({ description: 'UUID of the tool used by the master', example: 'tool-uuid-1234' })
  @IsString()
  @IsNotEmpty()
  toolID: string;

  @ApiProperty({ description: 'Minimum working hours required', example: 2 })
  @IsInt()
  @IsNotEmpty()
  minWorkingHour: number;

  @ApiProperty({ description: 'Total working hours', example: 5 })
  @IsInt()
  @IsNotEmpty()
  workingHours: number;

  @ApiProperty({ description: 'UUID of the associated level', example: 'level-uuid-5678' })
  @IsString()
  @IsNotEmpty()
  levelID: string;

  @ApiProperty({ description: 'UUID of the product associated with this job', example: 'product-uuid-9012' })
  @IsString()
  @IsNotEmpty()
  productID: string;

  @ApiProperty({ description: 'Hourly price for this job', example: 25000 })
  @IsInt()
  @IsNotEmpty()
  priceHourly: number;

  @ApiProperty({ description: 'Daily price for this job', example: 100000 })
  @IsInt()
  @IsNotEmpty()
  priceDaily: number;

  @ApiProperty({ description: 'Master’s experience description', example: '3 years experience in electrical tools' })
  @IsString()
  @IsNotEmpty()
  experience: string;

  @ApiProperty({ description: 'UUID of the master', example: 'master-uuid-3456' })
  @IsUUID()
  @IsNotEmpty()
  masterID: string;
}
