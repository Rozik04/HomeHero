import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateToolDto {
  @ApiProperty({ description: 'The russian name of the tool', example: 'Отвертка' })
  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @ApiProperty({ description: 'The uzbek name of the tool', example: 'Otvyortka' })
  @IsString()
  @IsNotEmpty()
  nameUz: string;

  @ApiProperty({ description: 'The english name of the tool', example: 'Screwdriver' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ description: 'The russian description of the tool', example: 'Отвертка с резиновой ручкой' })
  @IsString()
  @IsNotEmpty()
  descriptionRu: string;

  @ApiProperty({ description: 'The uzbek description of the tool', example: 'Rezinali tutqichli otvyortka' })
  @IsString()
  @IsNotEmpty()
  descriptionUz: string;

  @ApiProperty({ description: 'The english description of the tool', example: 'Screwdriver with rubber handle' })
  @IsString()
  @IsNotEmpty()
  descriptionEn: string;

  @ApiProperty({ description: 'The price of the tool', example: 15000 })
  @IsInt()
  price: number;

  @ApiProperty({ description: 'The quantity available', example: 100 })
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'The ID of the brand', example: 'brand-uuid-123' })
  @IsString()
  @IsNotEmpty()
  brandID?: string;

  @ApiProperty({ description: 'The ID of the capacity', example: 'capacity-uuid-456' })
  @IsString()
  @IsNotEmpty()
  capacityID?: string;

  @ApiProperty({ description: 'The ID of the size', example: 'size-uuid-789' })
  @IsString()
  @IsNotEmpty()
  sizeID?: string;

  @ApiProperty({ description: 'Image filename or path', example: 'tool-image.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: 'Is the tool active?', example: true })
  @IsBoolean()
  isActive: boolean;
}
