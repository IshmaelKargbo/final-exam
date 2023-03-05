import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vaccination } from "./vaccination";

@Entity()
export class Country {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { unique: true })
  name: string;

  @OneToMany(() => Vaccination, (v) => v.country)
  vaccinations: Vaccination[];
}
