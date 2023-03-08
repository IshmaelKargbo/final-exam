import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from 'src/infra';
import { RoleModule } from './module/role';
import { UserModule } from './module/user';
import { VaccinationModule } from './module/vaccination';

@Module({
  imports: [
    InfraModule,
    RoleModule,
    UserModule,
    VaccinationModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().default(8881),
        NODE_ENV: Joi.string().default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SSL: Joi.boolean().required(),
        JWT_SECRET: Joi.string().required(),
        RABBITMQ_USER: Joi.string().required(),
        RABBITMQ_PASSWORD: Joi.string().required(),
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_QUEUE_NAME: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
