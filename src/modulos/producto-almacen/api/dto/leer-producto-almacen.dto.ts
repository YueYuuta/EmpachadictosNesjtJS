import { LeerProductoDto } from '@modulos/producto/api/dto';
import { Producto } from '@modulos/producto/entidates/producto.entity';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LeerProductoAlmacenDto {
  @Expose()
  readonly ProductoAlmacenID: number;

  @Expose()
  @Type(type => Producto)
  readonly ProductoID: LeerProductoDto[];

  @Expose()
  readonly Ingreso: number;

  @Expose()
  readonly Egreso: number;

  @Expose()
  readonly Fecha: string;
}
