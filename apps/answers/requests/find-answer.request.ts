import { IsString } from 'class-validator';

export class FindAnswerRequest {
  @IsString()
  id: string;
}
