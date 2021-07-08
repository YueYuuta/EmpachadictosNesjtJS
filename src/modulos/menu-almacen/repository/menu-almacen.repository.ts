import { EntityRepository, Repository } from 'typeorm';
import { MenuAlmacen } from '../entidates/menu-almacen.entity';

@EntityRepository(MenuAlmacen)
export class MenuAlmacenRepository extends Repository<MenuAlmacen> {}
