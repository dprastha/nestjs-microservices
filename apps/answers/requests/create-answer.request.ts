import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  questionId: string;
}
