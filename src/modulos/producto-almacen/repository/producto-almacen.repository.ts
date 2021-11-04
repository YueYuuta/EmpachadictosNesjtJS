import { EntityRepository, Repository } from 'typeorm';
import { ProductoAlmacen } from '../entidates/producto-almacen.entity';

@EntityRepository(ProductoAlmacen)
export class ProductoAlmacenRepository extends Repository<ProductoAlmacen> {}
