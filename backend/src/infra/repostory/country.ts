import { Country } from 'src/domain/model/country';
import { DataSource, Repository } from 'typeorm';

export class CountryRepostory {
  repo: Repository<Country>;

  constructor(db: DataSource) {
    this.repo = db.getRepository(Country);
  }

  async create(payload: Country) {
    return this.repo.save(payload);
  }

  async findOne(name: string) {
    return this.repo.findOneBy({ name });
  }
}
