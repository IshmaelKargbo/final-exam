import {
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import {
  Vaccination,
  VaccinationDownload,
  VaccinationInterface,
} from 'src/domain/model/vaccination';
import { VaccinationEntityInterface } from 'src/infra/enitity/vaccination';

@Injectable()
export class VaccinationService implements VaccinationInterface {
  constructor(private readonly entity: VaccinationEntityInterface) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async downloadCSV() {
    const records = await this.entity.find();
    return records.map((record) => new VaccinationDownload(record));
  }

  async find(): Promise<Vaccination[]> {
    const records = await this.entity.find();
    return records.map((record) => new Vaccination(record));
  }
  async findOne(id: string): Promise<Vaccination> {
    const record = await this.entity.findOne(id);
    return new Vaccination(record);
  }
}
