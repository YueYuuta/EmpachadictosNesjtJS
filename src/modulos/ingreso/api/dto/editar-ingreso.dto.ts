import { tipoPago } from '@modulos/ingreso/entidates/tipo.enum';
import { TipoCompra } from '@utils/enums';
import { IsOptional } from 'class-validator';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { IngresoDetalleEditarDto } from './editar-ingreso-detalle.dto';

export class EditarIngresoDto {
  @IsOptional()
  @IsNotEmpty({ message: 'El detalle no debe ir vacio!' })
  readonly Detalle: IngresoDetalleEditarDto;

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
