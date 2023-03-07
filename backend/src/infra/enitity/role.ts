import { initPermissions } from 'src/common/permission';
import { Permission } from 'src/domain/dto/role';
import { Entity, Column, BeforeInsert, OneToMany, JoinColumn } from 'typeorm';
import { Base } from './base';
import { UserEntity } from './user';

@Entity('role')
export class RoleEntity extends Base {
  @Column('varchar')
  name: string;

  @Column('jsonb', { nullable: true })
  permissions: Permission[];

  @OneToMany(() => UserEntity, (user) => user.role)
  @JoinColumn()
  users: UserEntity[];

  @BeforeInsert()
  async initPermissions() {
    this.permissions = initPermissions();
  }
}

export abstract class RoleEntityInterface {
  abstract create(payload: RoleEntity): Promise<RoleEntity>;
  abstract update(payload: RoleEntity): Promise<RoleEntity>;
  abstract delete(id: string): Promise<RoleEntity>;
  abstract findOne(id: string): Promise<RoleEntity>;
  abstract find(): Promise<RoleEntity[]>;
}
