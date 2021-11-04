import { EntityRepository, Repository } from 'typeorm';
import { ProductoAlmacenDetalle } from '../entidates/producto-almacen-detalle.entity';

@EntityRepository(ProductoAlmacenDetalle)
export class ProductoAlmacenDetalleRepository extends Repository<
  ProductoAlmacenDetalle
> {}
