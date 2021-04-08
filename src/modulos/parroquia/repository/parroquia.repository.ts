import { EntityRepository, Repository } from 'typeorm';
import { Parroquia } from '@modulos/parroquia/entidades/parroquia.entity';

@EntityRepository(Parroquia)
export class ParroquiaRepository extends Repository<Parroquia> {}
