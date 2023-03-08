import { VaccinationEntity } from 'src/infra/enitity/vaccination';
import { Country } from './country';

export class Vaccination {
  id: string;
  date: string;
  countryName: string;
  vaccine: string;
  source: string;
  totalVaccinations: number;
  peopleVaccinated: number;
  fullyVaccinated: number;
  totalBoosters: number;
  country: Country;

  constructor(partial: Partial<VaccinationEntity>) {
    Object.assign(this, partial);
  }
}

export abstract class VaccinationInterface {
  abstract find(): Promise<Vaccination[]>;
  abstract findOne(id: string): Promise<Vaccination>;
}
