import { EntityRepository, Repository } from 'typeorm';
import { UsuarioDetalle } from '../entidates/usuario-detalle.entity';

@EntityRepository(UsuarioDetalle)
export class UsuarioDetalleRepository extends Repository<UsuarioDetalle> {}
