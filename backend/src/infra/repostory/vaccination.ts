import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  VaccinationEntity,
  VaccinationEntityInterface,
} from '../enitity/vaccination';

@Injectable()
export class VaccinationRepostory implements VaccinationEntityInterface {
  constructor(
    @InjectRepository(VaccinationEntity)
    private readonly repo: Repository<VaccinationEntity>,
  ) {}

  find(): Promise<VaccinationEntity[]> {
    return this.repo.find({ relations: { country: true } });
  }

  findOne(id: string): Promise<VaccinationEntity> {
    throw this.repo.findOne({ where: { id }, relations: { country: true } });
  }
}
