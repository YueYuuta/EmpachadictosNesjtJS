import { tipoPago } from '@modulos/ingreso/entidates/tipo.enum';
import { TipoCompra } from '@utils/enums';
import { IsArray, IsOptional } from 'class-validator';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { IngresoDetalleDto } from './ingreso-detalle.dto';
export class EditarIngresoDto {
  @IsOptional()
  @IsNotEmpty({ message: 'El detalle no debe ir vacio!' })
  @IsArray({ message: 'formato incorrecto, formato correcto: Array' })
  readonly Detalle: IngresoDetalleDto[];

  @IsOptional()
  @IsNotEmpty({ message: 'La observacion no debe ir vacio!' })
  @IsString()
  readonly Observacion: string;

  @IsNotEmpty({ message: 'El tipo de factura no debe ir vacio!' })
  @IsString()
  TipoCompra: TipoCompra;

  @IsNotEmpty({ message: 'El tipo de pago no debe ir vacio!' })
  @IsString()
  TipoPago: tipoPago;

  @IsOptional()
  @IsNotEmpty({ message: 'El cliente no debe ir vacio!' })
  @IsNumber()
  readonly ProveedorID: number;
}
