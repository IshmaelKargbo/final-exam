import { Injectable } from '@nestjs/common';
import { CreateRoleDTO, UpdateRoleDTO } from 'src/domain/dto/role';
import { Role, RoleInterface } from 'src/domain/model/role';
import { RoleEntity, RoleEntityInterface } from 'src/infra/enitity/role';

@Injectable()
export class RoleService implements RoleInterface {
  constructor(private readonly entity: RoleEntityInterface) {}
  async create(payload: CreateRoleDTO): Promise<Role> {
    const entity = new RoleEntity();
    entity.name = payload.name;
    const record = await this.entity.create(entity);
    return Promise.resolve(new Role(record));
  }

  async update(payload: UpdateRoleDTO): Promise<Role> {
    const entity = new RoleEntity();

    entity.name = payload.name;
    entity.id = payload.id;
    entity.permissions = payload.permissions;
    const record = await this.entity.update(entity);
    return Promise.resolve(new Role(record));
  }

  async find(): Promise<Role[]> {
    const records = await this.entity.find();
    return records.map((record) => new Role(record));
  }

  async findOne(id: string): Promise<Role> {
    const record = await this.entity.findOne(id);
    return Promise.resolve(new Role(record));
  }

  async delete(id: string): Promise<Role> {
    const record = await this.entity.delete(id);
    return Promise.resolve(new Role(record));
  }
}
