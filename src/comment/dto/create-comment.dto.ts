import { IsString, IsNotEmpty, IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentRatingDto {
  @ApiProperty({ example: 'uuid-1', description: 'Master ID' })
  @IsString()
  @IsNotEmpty()
  masterID: string;

  @ApiProperty({ example: 5, description: 'Rating star (1-5)' })
  @IsInt()
  star: number;
}

export class CreateCommentDto {
  @ApiProperty({ example: 'Yaxshi ish qildi', description: 'Comment matni' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'order-123', description: 'Buyurtma IDsi' })
  @IsString()
  @IsNotEmpty()
  orderID: string;

  @ApiProperty({
    type: [CreateCommentRatingDto],
    description: 'Bir nechta usta uchun baholar'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCommentRatingDto)
  ratings: CreateCommentRatingDto[];
}
