import { EntityRepository, Repository } from 'typeorm';
import { MenuDetalle } from '../entidates/menu-detalle.entity';

@EntityRepository(MenuDetalle)
export class MenuDetalleRepository extends Repository<MenuDetalle> {}
