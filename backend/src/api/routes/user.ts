import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ChangePasswordDTO,
  ChangeUsernameDTO,
  CreateUserDTO,
  UpdateUserDTO,
} from 'src/domain/dto/user';
import { UserInterface } from 'src/domain/model/user';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly domain: UserInterface) {}

  @Post()
  async create(@Body() payload: CreateUserDTO) {
    return this.domain.create(payload);
  }

  @Patch()
  async update(@Body() payload: UpdateUserDTO) {
    return this.domain.update(payload);
  }

  @Patch('change-password')
  async changePassword(@Body() payload: ChangePasswordDTO) {
    return this.domain.changePassword(payload);
  }

  @Patch(':id/reset')
  async resetPassword(@Param('id') id: string) {
    return this.domain.resetPassword(id);
  }

  @Patch('change-username')
  async changeUsername(@Body() payload: ChangeUsernameDTO) {
    return this.domain.changeUsername(payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.domain.delete(id);
  }

  @Get()
  async find() {
    return this.domain.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.domain.findOne(id);
  }
}
