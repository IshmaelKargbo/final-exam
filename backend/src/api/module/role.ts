import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleInterface } from 'src/domain/model/role';
import { RoleEntity, RoleEntityInterface } from 'src/infra/enitity/role';
import { UserEntity } from 'src/infra/enitity/user';
import { RoleRepostory } from 'src/infra/repostory/role';
import { RoleService } from 'src/service/role';
import { RoleController } from '../routes/role';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  providers: [
    {
      provide: RoleInterface,
      useClass: RoleService,
    },
    {
      provide: RoleEntityInterface,
      useClass: RoleRepostory,
    },
  ],
  controllers: [RoleController],
})
export class RoleModule {}
