import { EntityRepository, Repository } from 'typeorm';
import { Producto } from '../entidates/producto.entity';

@EntityRepository(Producto)
export class ProductoRepository extends Repository<Producto> {}
