import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  questionUz: string;

  @IsString()
  @IsNotEmpty()
  questionRu: string;

  @IsString()
  @IsNotEmpty()
  questionEn: string;

  @IsString()
  @IsNotEmpty()
  answerUz: string;

  @IsString()
  @IsNotEmpty()
  answerRu: string;

  @IsString()
  @IsNotEmpty()
  answerEn: string;
}
