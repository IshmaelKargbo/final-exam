import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInterface } from 'src/domain/model/user';
import { RoleEntity } from 'src/infra/enitity/role';
import { UserEntity, UserEntityInterface } from 'src/infra/enitity/user';
import { UserRepostory } from 'src/infra/repostory/user';
import { UserService } from 'src/service/user';
import { UserController } from '../routes/user';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  providers: [
    {
      provide: UserInterface,
      useClass: UserService,
    },
    {
      provide: UserEntityInterface,
      useClass: UserRepostory,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
