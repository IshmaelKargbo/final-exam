import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInterface } from 'src/domain/model/user';
import { RoleEntity } from 'src/infra/enitity/role';
import { UserEntity, UserEntityInterface } from 'src/infra/enitity/user';
import { UserRepostory } from 'src/infra/repostory/user';
import { UserService } from 'src/service/user';
import { SessionSerializer } from '../auth/session.serializer';
import { LocalStrategy } from '../auth/strategy/local';
import { AuthController } from '../routes/auth';
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
    LocalStrategy,
    SessionSerializer,
  ],
  controllers: [UserController, AuthController],
})
export class UserModule {}
