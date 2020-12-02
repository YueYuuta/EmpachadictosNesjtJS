import { EntityRepository, Repository } from 'typeorm';

import { UsuarioAlmacen } from '../entidates/usuario-almacen.entity';

@EntityRepository(UsuarioAlmacen)
export class UsuarioAlmacenRepository extends Repository<UsuarioAlmacen> {}
