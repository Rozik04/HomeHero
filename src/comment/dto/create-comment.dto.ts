import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The message of the comment',
    example: 'Great service and very professional!',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Star rating from 1 to 5',
    example: 5,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  star: number;

  @ApiProperty({
    description: 'The ID of the master receiving the comment',
    example: 'master-uuid-123',
  })
  @IsString()
  @IsNotEmpty()
  masterID: string;

  @ApiProperty({
    description: 'The ID of the related order',
    example: 'order-uuid-456',
  })
  @IsString()
  @IsNotEmpty()
  orderID: string;


}
