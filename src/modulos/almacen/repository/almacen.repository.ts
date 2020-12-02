import { EntityRepository, Repository } from 'typeorm';
import { Almacen } from '../entidates/almacen.entity';

@EntityRepository(Almacen)
export class AlmacenRepository extends Repository<Almacen> {}
