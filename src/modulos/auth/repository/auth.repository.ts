import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from '@modulos/usuario/entidates/usuario.entity';

@EntityRepository(Usuario)
export class AuthRepository extends Repository<Usuario> {}
