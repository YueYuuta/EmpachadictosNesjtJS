import { EntityRepository, Repository } from 'typeorm';
import { RolPermiso } from '../entidades/rol-permiso.entity';

@EntityRepository(RolPermiso)
export class RolPermisoRepository extends Repository<RolPermiso> {}
