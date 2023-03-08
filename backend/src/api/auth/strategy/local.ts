import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInterface } from 'src/domain/model/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private model: UserInterface) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.model.login(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
