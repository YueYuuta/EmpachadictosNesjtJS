import { EntityRepository, Repository } from 'typeorm';
import { Proveedor } from '../entidates/proveedor.entity';

@EntityRepository(Proveedor)
export class ProveedorRepository extends Repository<Proveedor> {}
