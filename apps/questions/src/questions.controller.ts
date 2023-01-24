import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Question } from '../entities/question.entity';
import { createQuestionRequest } from '../requests/create-question.request';
import { QuestionsService } from './questions.service';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @MessagePattern({ cmd: 'get-all-questions' })
  async findQuestions(): Promise<Question[]> {
    return await this.questionsService.findQuestions();
  }

  @EventPattern()
  async createQuestion(request: createQuestionRequest): Promise<Question> {
    return await this.createQuestion(request);
  }
}
