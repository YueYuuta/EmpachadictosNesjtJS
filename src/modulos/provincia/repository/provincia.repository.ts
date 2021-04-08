import { EntityRepository, Repository } from 'typeorm';
import { Provincia } from '@modulos/provincia/entidades/provincia.entity';

@EntityRepository(Provincia)
export class ProvinciaRepository extends Repository<Provincia> {}
