import { tipoPago } from '@modulos/pedido/entidates/tipo.enum';
import { TipoCompra } from '@utils/enums';
import { IsArray, IsOptional } from 'class-validator';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { IngresoDetalleDto } from './ingreso-detalle.dto';

export class CrearIngresoDto {
  @IsNotEmpty({ message: 'El detalle no debe ir vacio!' })
  @IsArray({ message: 'formato incorrecto, formato correcto: Array' })
  readonly Detalle: IngresoDetalleDto[];

  @IsNotEmpty({ message: 'El tipo de factura no debe ir vacio!' })
  @IsString()
  readonly TipoCompra: TipoCompra;

  @IsNotEmpty({ message: 'El tipo de pago no debe ir vacio!' })
  @IsString()
  readonly TipoPago: tipoPago;

  @IsNotEmpty({ message: 'El proveedor no debe ir vacio!' })
  @IsNumber()
  readonly ProveedorID: number;

  @IsNotEmpty({ message: 'El almacen no debe ir vacio!' })
  @IsNumber()
  readonly AlmacenID: number;

  @IsOptional()
  @IsNotEmpty({ message: 'La observacion  no debe ir vacia!' })
  @IsString()
  Observacion: string;
}
