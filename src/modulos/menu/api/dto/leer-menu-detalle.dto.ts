import { LeerProductoDto } from '@modulos/producto/api/dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LeerMenuDetalleDto {
  @Expose()
  readonly MenuDetalleID: number;

  @Expose()
  @Type(type => LeerProductoDto)
  readonly Producto: LeerProductoDto;

  @Expose()
  readonly Cantidad: number;
}
