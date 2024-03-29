import { tipoPago } from '@modulos/pedido/entidates/tipo.enum';
import { TipoFactura } from '@utils/enums';
import { IsArray, IsOptional } from 'class-validator';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PedidoDetalleDto } from './pedido-detalle.dto';
export class CrearPedidoDto {
  @IsNotEmpty({ message: 'El menu no deben estar vacios!' })
  @IsArray({ message: 'formato incorrecto, formato correcto: Array' })
  readonly Detalle: PedidoDetalleDto[];

  @IsOptional()
  @IsNotEmpty({ message: 'El tipo de factura no debe ir vacio!' })
  @IsString()
  TipoFactura: TipoFactura;

  @IsOptional()
  @IsNotEmpty({ message: 'El tipo de pago no debe ir vacio!' })
  @IsString()
  TipoPago: tipoPago;

  @IsNotEmpty({ message: 'El cliente no debe ir vacio!' })
  @IsNumber()
  readonly ClienteID: number;

  @IsOptional()
  @IsNotEmpty({ message: 'El cliente no debe ir vacio!' })
  @IsNumber()
  readonly UsuarioID: number;

  @IsNotEmpty({ message: 'El almacen no debe ir vacio!' })
  @IsNumber()
  readonly AlmacenID: number;

  @IsNotEmpty({ message: 'La Mesa no debe ir vacia no debe ir vacio!' })
  @IsNumber()
  readonly MesaID: number;

  @IsOptional()
  @IsNotEmpty({ message: 'La fecha del pedido no debe ir vacia!' })
  @IsString()
  FechaPedido?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'La fecha del entrega no debe ir vacia!' })
  @IsString()
  FechaPedidoEntrega?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'La observacion del bar no debe ir vacia!' })
  @IsString()
  ObservacionBar?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'La observacion de la cocina no debe ir vacia!' })
  @IsString()
  ObservacionCocina?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'La observacion de la parrilla no debe ir vacia!' })
  @IsString()
  ObservacionParrilla?: string;
}
