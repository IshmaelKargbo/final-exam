import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CountryEntity } from './country';

@Entity('vaccination')
export class VaccinationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  date: string;

  @Column('varchar')
  vaccine: string;

  @Column('varchar')
  source: string;

  @Column('integer')
  totalVaccinations: number;

  @Column('integer')
  peopleVaccinated: number;

  @Column('integer')
  fullyVaccinated: number;

  @Column('integer')
  totalBoosters: number;

  @ManyToOne(() => CountryEntity, (c) => c.vaccinations)
  country: CountryEntity;
}

export abstract class VaccinationEntityInterface {
  abstract find(): Promise<VaccinationEntity[]>;
  abstract findOne(id: string): Promise<VaccinationEntity>;
}
