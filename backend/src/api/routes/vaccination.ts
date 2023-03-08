import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Response,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { json2csvAsync } from 'json-2-csv';
import { VaccinationEntityInterface } from 'src/infra/enitity/vaccination';
import { AuthenticatedGuard } from '../auth/guard/auth';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('vaccination')
export class VaccinationController {
  constructor(private readonly entity: VaccinationEntityInterface) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async find() {
    return this.entity.find();
  }

  @Get('/csv')
  async downloadCSV(@Response() res: Res) {
    const records = await this.entity.find();
    const csv = await json2csvAsync(records);
    res.contentType('csv');
    res.attachment('vaccination.csv');
    res.send(csv);
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.entity.findOne(id);
  }
}
