import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QuestionsModule } from './questions.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    QuestionsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['ampq://rabitmq:5672'],
        queue: 'questions_queue',
      },
    },
  );
  await app.listen();
}
bootstrap();
