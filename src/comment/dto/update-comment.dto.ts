import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateCommentDto {
  @ApiPropertyOptional({
    description: 'The message of the comment',
    example: 'Updated comment message',
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({
    description: 'Star rating from 1 to 5',
    example: 4,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  star?: number;

  @ApiPropertyOptional({
    description: 'The ID of the master receiving the comment',
    example: 'master-uuid-123',
  })
  @IsString()
  @IsOptional()
  masterID?: string;

  @ApiPropertyOptional({
    description: 'The ID of the related order',
    example: 'order-uuid-456',
  })
  @IsString()
  @IsOptional()
  orderID?: string;


}
