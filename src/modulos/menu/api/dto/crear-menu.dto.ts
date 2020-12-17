import { IsBoolean, IsArray } from 'class-validator';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { MenuDetalleDto } from './menu-detalle.dto';
export class CrearMenuDto {
  @IsNotEmpty({ message: 'Los productos no deben estar vacios!' })
  @IsArray({ message: 'formato incorrecto, formato correcto: Array' })
  readonly Detalle: MenuDetalleDto[];

  @IsNotEmpty({ message: 'La descripcion no debe ir vacio!' })
  @IsString()
  readonly Descripcion: string;

  @IsNotEmpty({ message: 'El precio de venta no debe ir vacio!' })
  @IsNumber()
  readonly PrecioVenta: number;

  @IsNotEmpty({ message: 'El estado del iva no debe ir vacio!' })
  @IsBoolean()
  readonly EstadoIva: boolean;

  @IsNotEmpty({ message: 'El estado del descuento no debe ir vacio!' })
  @IsBoolean()
  readonly EstadoPrecioVentaDinamico: boolean | null;
}
