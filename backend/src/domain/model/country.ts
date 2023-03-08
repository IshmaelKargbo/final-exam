import { CountryEntity } from 'src/infra/enitity/country';
import { Vaccination } from './vaccination';

export class Country {
  id: string;
  name: string;
  vaccinations: Vaccination[];

  constructor(partial: Partial<CountryEntity>) {
    Object.assign(this, partial);
  }
}
