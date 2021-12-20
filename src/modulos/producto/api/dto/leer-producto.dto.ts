import { Exclude, Expose, Type } from 'class-transformer';
import { LeerCategoriaDto } from '@modulos/categoria/api/dto/leer-categoria.dto';
import { PantallaEnum } from '@modulos/producto/entidates/pantalla.enum';

@Exclude()
export class LeerProductoDto {
  @Expose()
  readonly ProductoID: number;

  @Expose()
  @Type(type => LeerCategoriaDto)
  readonly Categoria: LeerCategoriaDto;

  @Expose()
  readonly Descripcion: string;

  @Expose()
  readonly CodigoBarra: string;

  @Expose()
  readonly Pantalla: PantallaEnum;

  @Expose()
  readonly PrecioCompra: number;

  @Expose()
  readonly PrecioVenta: number;

  @Expose()
  readonly PrecioSinIva: number;

  @Expose()
  readonly PorcentajeGanancia: number;

  @Expose()
  readonly EstadoIva: boolean;

  @Expose()
  readonly Fecha: string;

  @Expose()
  readonly Imagen: string;

  @Expose()
  readonly PrecioVentaConDescuento: number | null;

  @Expose()
  readonly EstadoDescuento: boolean | null;

  @Expose()
  readonly PorcentajeGananciaDescuento: number | null;

  @Expose()
  readonly PrecioSinIvaDescuento: number;
}
