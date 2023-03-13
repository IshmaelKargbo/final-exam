import { Injectable } from '@nestjs/common';
import { newPassword, welcomeMail } from 'src/common/generator';
import {
  ChangePasswordDTO,
  ChangeUsernameDTO,
  CreateUserDTO,
  UpdateUserDTO,
} from 'src/domain/dto/user';
import { User, UserInterface } from 'src/domain/model/user';
import { RoleEntity } from 'src/infra/enitity/role';
import { UserEntity, UserEntityInterface } from 'src/infra/enitity/user';

@Injectable()
export class UserService implements UserInterface {
  constructor(private readonly entity: UserEntityInterface) {}

  async create(payload: CreateUserDTO): Promise<User> {
    const password = newPassword();
    const user = new UserEntity();

    const role = new RoleEntity();
    role.id = payload.roleId;

    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.email = payload.email;
    user.username = payload.username.toLowerCase();
    user.role = role;
    user.password = password;

    const record = await this.entity.create(user);

    // const welcome = welcomeMail({ ...record, password: password });

    // this.mail.emit('welcome', welcome);

    return Promise.resolve(new User(record));
  }

  async update(payload: UpdateUserDTO): Promise<User> {
    const user = new UserEntity();

    const role = new RoleEntity();
    role.id = payload.roleId;

    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.email = payload.email;
    user.role = role;

    const record = await this.entity.update(user);

    return Promise.resolve(new User(record));
  }

  async changeUsername(payload: ChangeUsernameDTO): Promise<User> {
    const user = new UserEntity();

    user.id = payload.id;
    user.username = payload.username.toLowerCase();

    const record = await this.entity.changeUsername(user);

    return Promise.resolve(new User(record));
  }

  async changePassword(payload: ChangePasswordDTO): Promise<User> {
    const user = new UserEntity();

    user.id = payload.id;
    user.password = payload.password;

    const record = await this.entity.changePassword(user);

    return Promise.resolve(new User(record));
  }

  async resetPassword(id: string): Promise<User> {
    const password = newPassword();
    const user = new UserEntity();

    user.id = id;
    user.password = password;

    const record = await this.entity.resetPassword(user);

    // const welcome = welcomeMail({ ...record, password: password });

    // this.mail.emit('welcome', welcome);

    return Promise.resolve(new User(record));
  }

  async login(username: string, password: string): Promise<User> {
    const record = await this.entity.login(username.toLowerCase(), password);

    return Promise.resolve(new User(record));
  }

  async delete(id: string): Promise<User> {
    const record = await this.entity.delete(id);

    return Promise.resolve(new User(record));
  }

  async findOne(id: string): Promise<User> {
    const record = await this.entity.findOne(id);

    return Promise.resolve(new User(record));
  }

  async find(): Promise<User[]> {
    const records = await this.entity.find();
    return records.map((record) => new User(record));
  }
}
