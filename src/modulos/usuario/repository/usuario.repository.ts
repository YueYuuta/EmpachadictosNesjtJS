import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from '../entidates/usuario.entity';

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {}
