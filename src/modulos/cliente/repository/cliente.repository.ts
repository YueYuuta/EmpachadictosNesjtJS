import { EntityRepository, Repository } from 'typeorm';
import { Cliente } from '../entidates/cliente.entity';

@EntityRepository(Cliente)
export class ClienteRepository extends Repository<Cliente> {}
