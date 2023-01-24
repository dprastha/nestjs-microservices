import { Controller } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Answer } from '../entities/answer.entity';
import { FindAnswerRequest } from '../requests/find-answer.request';
import { CreateAnswerRequest } from '../requests/create-answer.request';

@Controller()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @MessagePattern({ cmd: 'get-all-answers' })
  async findAnswers(request: FindAnswerRequest): Promise<Answer[]> {
    return await this.answersService.findAnswers(request);
  }

  @EventPattern()
  async createAnswer(request: CreateAnswerRequest): Promise<Answer> {
    return this.answersService.createAnswer(request);
  }
}
