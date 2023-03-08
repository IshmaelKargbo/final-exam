import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinationInterface } from 'src/domain/model/vaccination';
import { CountryEntity } from 'src/infra/enitity/country';
import {
  VaccinationEntity,
  VaccinationEntityInterface,
} from 'src/infra/enitity/vaccination';
import { VaccinationRepostory } from 'src/infra/repostory/vaccination';
import { VaccinationService } from 'src/service/vaccination';
import { VaccinationController } from '../routes/vaccination';

@Module({
  imports: [TypeOrmModule.forFeature([VaccinationEntity, CountryEntity])],
  providers: [
    {
      provide: VaccinationInterface,
      useClass: VaccinationService,
    },
    {
      provide: VaccinationEntityInterface,
      useClass: VaccinationRepostory,
    },
  ],
  controllers: [VaccinationController],
})
export class VaccinationModule {}
