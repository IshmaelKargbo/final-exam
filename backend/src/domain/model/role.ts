import { RoleEntity } from 'src/infra/enitity/role';
import { CreateRoleDTO, Permission, UpdateRoleDTO } from '../dto/role';
import { Exclude, Type } from 'class-transformer';
import { User } from './user';

export class Role {
  id: string;

  name: string;

  permissions: Permission[];

  @Type(() => User)
  users: User[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}

export abstract class RoleInterface {
  abstract create(payload: CreateRoleDTO): Promise<Role>;
  abstract update(payload: UpdateRoleDTO): Promise<Role>;
  abstract find(): Promise<Role[]>;
  abstract findOne(id: string): Promise<Role>;
  abstract delete(id: string): Promise<Role>;
}
