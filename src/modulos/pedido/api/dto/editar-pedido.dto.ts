import { tipoPago } from '@modulos/pedido/entidates/tipo.enum';
import { TipoFactura } from '@utils/enums';
import { IsArray, IsOptional } from 'class-validator';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PedidoDetalleDto } from './pedido-detalle.dto';
export class EditarPedidoDto {
  @IsOptional()
  @IsNotEmpty({ message: 'El menu no deben estar vacios!' })
  @IsArray({ message: 'formato incorrecto, formato correcto: Array' })
  readonly Detalle: PedidoDetalleDto[];

  @IsOptional()
  @IsNotEmpty({ message: 'La descripcion no debe ir vacio!' })
  @IsString()
  readonly Observacion: string;

  @IsNotEmpty({ message: 'El tipo de factura no debe ir vacio!' })
  @IsString()
  TipoFactura: TipoFactura;

  @IsNotEmpty({ message: 'El tipo de pago no debe ir vacio!' })
  @IsString()
  TipoPago: tipoPago;

  @IsOptional()
  @IsNotEmpty({ message: 'El cliente no debe ir vacio!' })
  @IsNumber()
  readonly ClienteID: number;
}
