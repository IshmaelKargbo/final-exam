import { DataSource, Repository } from "typeorm";
import { Vaccination } from "../entity/vaccination";

export class VaccinationRepostory {
  repo: Repository<Vaccination>;

  constructor(db: DataSource) {
    this.repo = db.getRepository(Vaccination);
  }

  async create(payload: Vaccination) {
    this.repo.save(payload);
  }
}
