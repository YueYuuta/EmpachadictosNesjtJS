import { EntityRepository, Repository } from 'typeorm';
import { Rol } from '../../rol/entidades/rol.entity';

@EntityRepository(Rol)
export class RolRepository extends Repository<Rol> {}
