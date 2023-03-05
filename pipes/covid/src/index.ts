import { extract } from "./etl/extract";
import { loadToPostgres } from "./etl/load";
import { transformToVaccination } from "./etl/transform";
import { database } from "./infra/connection";
import { Vaccination } from "./infra/entity/vaccination";

database.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const startETLPipeline = async () => {
  try {
    const vaccinations: Vaccination[] = [];

    // Extract vaccine data
    const records = await extract();

    // Transform data
    records.forEach((countryData) => {
      countryData.forEach((v: any) => {
        const vaccination = transformToVaccination(v);
        vaccinations.push(vaccination);
      });
    });

    loadToPostgres(vaccinations);
  } catch (error) {
    console.log(error);
  }
};

startETLPipeline();
