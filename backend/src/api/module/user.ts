import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInterface } from 'src/domain/model/user';
import { RoleEntity } from 'src/infra/enitity/role';
import { UserEntity, UserEntityInterface } from 'src/infra/enitity/user';
import { UserRepostory } from 'src/infra/repostory/user';
import { UserService } from 'src/service/user';
import { UserController } from '../routes/user';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  providers: [
    {
      provide: UserInterface,
      useClass: UserService,
    },
    {
      provide: UserEntityInterface,
      useClass: UserRepostory,
    },
    {
      provide: 'MAIL_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBITMQ_USER');
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');
        const queueName = configService.get('RABBITMQ_QUEUE_NAME');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
