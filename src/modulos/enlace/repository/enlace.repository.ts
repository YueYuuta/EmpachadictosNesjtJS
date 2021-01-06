import { EntityRepository, Repository } from 'typeorm';
import { Enlace } from '@modulos/enlace/entidades/enlace.entity';

@EntityRepository(Enlace)
export class EnlaceRepository extends Repository<Enlace> {}
