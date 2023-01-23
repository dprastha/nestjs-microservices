import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { CreateAnswerRequest } from '../requests/create-answer.request';
import { FindAnswerRequest } from '../requests/find-answer.request';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async findAnswers(request: FindAnswerRequest): Promise<Answer[]> {
    return await this.answerRepository.find({
      where: {
        id: request.id,
      },
    });
  }

  async createAnswer(request: CreateAnswerRequest): Promise<Answer> {
    const newAnswer = new Answer();
    newAnswer.title = request.title;
    newAnswer.description = request.description;
    newAnswer.questionId = request.questionId;

    return await this.answerRepository.save(newAnswer);
  }
}
