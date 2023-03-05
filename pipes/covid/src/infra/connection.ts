import { DataSource } from "typeorm";
import { Country } from "./entity/country";
import { Vaccination } from "./entity/vaccination";

export const database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "secret",
  database: "pipline",
  synchronize: true,
  entities: [Country, Vaccination],
});
