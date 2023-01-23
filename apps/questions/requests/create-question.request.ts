import { IsNotEmpty, IsString } from 'class-validator';

export class createQuestionRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
