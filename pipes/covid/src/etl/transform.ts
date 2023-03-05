import { Vaccination } from "../infra/entity/vaccination";

export const transformToVaccination = (record: any): Vaccination => {
  const vaccination = new Vaccination();

  vaccination.countryName = record.location;
  vaccination.date = record.date;
  vaccination.fullyVaccinated = record.people_fully_vaccinated || 0;
  vaccination.peopleVaccinated = record.people_vaccinated || 0;
  vaccination.source = record.source_url || "NONE";
  vaccination.totalBoosters = record.total_boosters || 0;
  vaccination.vaccine = record.vaccine;
  vaccination.totalVaccinations = record.total_vaccinations || 0;

  return vaccination;
};
