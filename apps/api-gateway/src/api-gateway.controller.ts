import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Answer } from 'apps/answers/entities/answer.entity';
import { CreateAnswerRequest } from 'apps/answers/requests/create-answer.request';
import { Question } from 'apps/questions/entities/question.entity';
import { Observable, timeout } from 'rxjs';

@Controller('questions')
export class ApiGatewayController {
  constructor(
    @Inject('QUESTIONS_SERVICE')
    private readonly clientQuestion: ClientProxy,
    @Inject('ANSWERS_SERVICE')
    private readonly clientAnswer: ClientProxy,
  ) {}

  @Get()
  async findQuestions(): Promise<Observable<Question>> {
    return this.clientQuestion
      .send(
        {
          cmd: 'get-all-questions',
        },
        '',
      )
      .pipe(timeout(500));
  }

  @Post('/:questionId/answers')
  async createAnswer(
    @Body() request: CreateAnswerRequest,
    @Param('questionId') questionId: string,
  ): Promise<Observable<Answer>> {
    request.questionId = questionId;
    return this.clientAnswer.emit('answer_created', request).pipe(timeout(500));
  }

  @Get('/:questionsId/answers')
  async getAnswers(@Param('questionsId') questionsId: string) {
    return this.clientAnswer
      .send(
        {
          cmd: 'get-all-answers',
        },
        { questionsId },
      )
      .pipe(timeout(500));
  }
}
