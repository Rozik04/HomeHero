import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMasterJobDto {
  @IsString()
  @IsNotEmpty()
  toolID: string;

  @IsInt()
  @IsNotEmpty()
  minWorkingHour: number;

  @IsInt()
  @IsNotEmpty()
  workingHours: number;

  @IsString()
  @IsNotEmpty()
  levelID: string;

  
  @IsString()
  @IsNotEmpty()
  productID: string;

  @IsInt()
  @IsNotEmpty()
  priceHourly: number;

  @IsInt()
  @IsNotEmpty()
  priceDaily: number;

  @IsString()
  @IsNotEmpty()
  experience: string;
}
