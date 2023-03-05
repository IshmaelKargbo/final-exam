import { DataSource, Repository } from "typeorm";
import { Country } from "../entity/country";

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
