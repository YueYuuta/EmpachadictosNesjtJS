import { EntityRepository, Repository } from 'typeorm';
import { Cliente } from '../entidates/producto.entity';

@EntityRepository(Cliente)
export class ClienteRepository extends Repository<Cliente> {}
