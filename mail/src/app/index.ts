import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailController } from '../controllers/email';
import { MailInterface } from '../models/email';
import { MailService } from '../service/email';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        RABBITMQ_USER: Joi.string().required(),
        RABBITMQ_PASSWORD: Joi.string().required(),
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_QUEUE_NAME: Joi.string().required(),
      }),
    }),
  ],
  providers: [
    {
      provide: MailInterface,
      useClass: MailService,
    },
  ],
  controllers: [MailController],
})
export class AppModule {}
