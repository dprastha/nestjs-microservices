import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'nestjs_db_answers',
      entities: [Answer],
      synchronize: true,
    }),
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
