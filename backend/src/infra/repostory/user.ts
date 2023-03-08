import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkText, hashText } from 'src/common/encrypt';
import { Repository } from 'typeorm';
import { UserEntity, UserEntityInterface } from '../enitity/user';

@Injectable()
export class UserRepostory implements UserEntityInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async create(payload: UserEntity): Promise<UserEntity> {
    const checkUser = await this.repo.findOneBy({ username: payload.username });

    if (checkUser)
      throw new InternalServerErrorException(
        `user already exist with is username ${payload.username}`,
      );

    return this.repo.save(payload);
  }

  async changeUsername(payload: UserEntity): Promise<UserEntity> {
    try {
      const check = await this.findOne(payload.id);

      if (check.state === 'PENDING')
        throw new NotAcceptableException(
          'change your password before accessing this route',
        );

      const user = await this.repo.findOne({
        where: { username: payload.username },
      });

      if (user && user.id !== payload.id)
        throw new NotAcceptableException(
          `user already exists with this username ${payload.username}`,
        );

      if (user && user.id === payload.id) return user;

      await this.repo.update(
        { id: payload.id },
        { username: payload.username },
      );

      return this.findOne(payload.id);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(payload: UserEntity): Promise<UserEntity> {
    try {
      await this.findOne(payload.id);

      const password = await hashText(payload.password);

      await this.repo.update(
        { id: payload.id },
        {
          password,
          state: 'PENDING',
        },
      );

      return this.findOne(payload.id);
    } catch (error) {
      throw error;
    }
  }

  async changePassword(payload: UserEntity): Promise<UserEntity> {
    try {
      await this.findOne(payload.id);

      const password = await hashText(payload.password);

      await this.repo.update(
        { id: payload.id },
        {
          password,
          state: 'COMPLETE',
        },
      );

      return this.findOne(payload.id);
    } catch (error) {
      throw error;
    }
  }

  async update(payload: UserEntity): Promise<UserEntity> {
    try {
      await this.findOne(payload.id);

      await this.repo.update(
        { id: payload.id },
        {
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          role: payload.role,
        },
      );

      return this.findOne(payload.id);
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string): Promise<UserEntity> {
    const user = await this.repo.findOneBy({ username });

    if (!user) throw new UnauthorizedException(`invalid username ${user}`);

    const checkPassword = await checkText(password, user.password);

    if (!checkPassword) throw new UnauthorizedException(`invalid password`);

    return user;
  }

  async delete(id: string): Promise<UserEntity> {
    try {
      await this.findOne(id);

      this.repo.delete(id);

      return this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.repo.findOne({
      where: { id },
      relations: { role: true },
    });

    if (!user) throw new NotFoundException(`no user found for this ${id}`);

    return user;
  }

  find(): Promise<UserEntity[]> {
    return this.repo.find({ relations: { role: true } });
  }
}
