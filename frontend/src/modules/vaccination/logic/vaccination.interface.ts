interface Country {
  id: string;
  name: string;
}

export interface Vaccination {
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
}
