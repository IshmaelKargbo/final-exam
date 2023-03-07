import { Exclude, Type } from 'class-transformer';
import { UserEntity } from 'src/infra/enitity/user';
import {
  ChangePasswordDTO,
  ChangeUsernameDTO,
  CreateUserDTO,
  UpdateUserDTO,
} from '../dto/user';
import { Role } from './role';

export class User {
  id: string;

  lastName: string;

  email: string;

  username: string;

  state: string;

  @Type(() => Role)
  role: Role;

  @Exclude()
  password: string;

  @Exclude()
  isActive: boolean;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

export abstract class UserInterface {
  abstract create(payload: CreateUserDTO): Promise<User>;
  abstract update(payload: UpdateUserDTO): Promise<User>;
  abstract changeUsername(payload: ChangeUsernameDTO): Promise<User>;
  abstract changePassword(payload: ChangePasswordDTO): Promise<User>;
  abstract resetPassword(id: string): Promise<User>;
  abstract login(username: string, password: string): Promise<User>;
  abstract delete(id: string): Promise<User>;
  abstract findOne(id: string): Promise<User>;
  abstract find(): Promise<User[]>;
}
