import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { createQuestionRequest } from '../requests/create-question.request';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async findQuestions(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async createQuestion(request: createQuestionRequest): Promise<Question> {
    const newQuestion = new Question();
    newQuestion.title = request.title;
    newQuestion.description = request.description;

    return await this.questionRepository.save(newQuestion);
  }
}
