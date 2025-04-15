import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsInt()
  @Min(1)
  star: number;

  @IsString()
  @IsNotEmpty()
  masterID: string;

  @IsString()
  @IsNotEmpty()
  orderID: string;
}
