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
import { CreateRoleDTO, UpdateRoleDTO } from 'src/domain/dto/role';
import { Role, RoleInterface } from 'src/domain/model/role';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('role')
export class RoleController {
  constructor(private readonly domain: RoleInterface) {}

  @Post()
  async create(@Body() payload: CreateRoleDTO) {
    return this.domain.create(payload);
  }

  @Patch()
  async update(@Body() payload: UpdateRoleDTO) {
    return this.domain.update(payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.domain.delete(id);
  }

  @Get()
  async find(): Promise<Role[]> {
    return this.domain.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.domain.findOne(id);
  }
}
