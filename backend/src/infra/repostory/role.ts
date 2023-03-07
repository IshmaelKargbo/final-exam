import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity, RoleEntityInterface } from '../enitity/role';

@Injectable()
export class RoleRepostory implements RoleEntityInterface {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repo: Repository<RoleEntity>,
  ) {}

  async create(payload: RoleEntity): Promise<RoleEntity> {
    const checkRole = await this.repo.findOneBy({ name: payload.name });

    if (checkRole)
      throw new NotAcceptableException(
        `role already exist with is name ${payload.name}`,
      );

    return this.repo.save(payload);
  }

  async update(payload: RoleEntity): Promise<RoleEntity> {
    try {
      await this.findOne(payload.id);

      const role = await this.repo.findOneBy({ name: payload.name });

      if (role && role.id !== payload.id)
        throw new NotAcceptableException(
          `role already exist with is name ${payload.name}`,
        );

      if (role && role.name !== payload.name) return role;

      await this.repo.update({ id: payload.id }, { ...payload });

      return this.findOne(payload.id);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<RoleEntity> {
    try {
      const role = await this.findOne(id);

      await this.repo.delete(id);

      return role;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<RoleEntity> {
    const role = await this.repo.findOne({
      where: { id },
      relations: { users: true },
    });

    if (!role) throw new NotFoundException(`no role found for this ${id}`);

    return role;
  }

  find(): Promise<RoleEntity[]> {
    return this.repo.find();
  }
}
