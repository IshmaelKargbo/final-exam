import { database } from "../infra/connection";
import { Country } from "../infra/entity/country";
import { Vaccination } from "../infra/entity/vaccination";
import { CountryRepostory } from "../infra/repostory/country";
import { VaccinationRepostory } from "../infra/repostory/vaccination";

export const loadToPostgres = (records: Vaccination[]) => {
  const countryRepo = new CountryRepostory(database);
  const vaccineRepo = new VaccinationRepostory(database);

  records.forEach(async (record: Vaccination) => {
    try {
      const countryPayload = new Country();
      countryPayload.name = record.countryName;

      const country = await countryRepo.create(countryPayload);

      record.country = country;
      await vaccineRepo.create(record);
    } catch (error) {
      const country = await countryRepo.findOne(record.countryName);

      if (!country) return;

      record.country = country;
      await vaccineRepo.create(record);
    }
  });
};
