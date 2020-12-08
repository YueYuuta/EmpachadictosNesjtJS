import { EntityRepository, Repository } from 'typeorm';
import { Permiso } from '../entidades/permiso.entity';

@EntityRepository(Permiso)
export class PermisoRepository extends Repository<Permiso> {}
