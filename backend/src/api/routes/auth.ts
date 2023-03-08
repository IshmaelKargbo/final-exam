import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserInterface } from 'src/domain/model/user';
import { LocalAuthGuard } from '../auth/guard/local';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly domain: UserInterface) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async changePassword(@Request() req) {
    return req.user;
  }

  @Get('/logout')
  async Logout(@Request() req) {
    const user = req.user;
    req.session.destroy((e) => e);
    req.res.clearCookie('connect.sid');
    return user;
  }
}
