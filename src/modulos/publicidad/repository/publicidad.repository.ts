import { EntityRepository, Repository } from 'typeorm';
import { Publicidad } from '@modulos/publicidad/entidades/publicidad.entity';

@EntityRepository(Publicidad)
export class PublicidadRepository extends Repository<Publicidad> {}
