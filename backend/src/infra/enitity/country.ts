import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VaccinationEntity } from './vaccination';

@Entity('country')
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  name: string;

  @OneToMany(() => VaccinationEntity, (v) => v.country)
  vaccinations: VaccinationEntity[];
}
