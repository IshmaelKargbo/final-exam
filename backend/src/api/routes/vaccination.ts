import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { VaccinationEntityInterface } from 'src/infra/enitity/vaccination';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('vaccination')
export class VaccinationController {
  constructor(private readonly entity: VaccinationEntityInterface) {}

  @Get()
  async find() {
    return this.entity.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.entity.findOne(id);
  }
}
