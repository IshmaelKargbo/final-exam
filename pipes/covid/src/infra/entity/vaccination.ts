import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country";

@Entity()
export class Vaccination {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date")
  date: string;

  countryName: string;

  @Column("varchar")
  vaccine: string;

  @Column("varchar")
  source: string;

  @Column("integer")
  totalVaccinations: number;

  @Column("integer")
  peopleVaccinated: number;

  @Column("integer")
  fullyVaccinated: number;

  @Column("integer")
  totalBoosters: number;

  @ManyToOne(() => Country, (c) => c.vaccinations)
  country: Country;
}
