import { IsBoolean, IsOptional } from 'class-validator';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CrearProductoDto {
  @IsNotEmpty({ message: 'La categoria no puede ir vacia!' })
  @IsNumber()
  readonly Categoria: number;

  @IsNotEmpty({ message: 'La descripcion no debe ir vacio!' })
  @IsString()
  readonly Descripcion: string;

  @IsNotEmpty({ message: 'El precio de compra no debe ir vacio!' })
  @IsNumber()
  readonly PrecioCompra: number;

  @IsNotEmpty({ message: 'El precio de venta no debe ir vacio!' })
  @IsNumber()
  readonly PrecioVenta: number;

  @IsNotEmpty({ message: 'El estado del iva no debe ir vacio!' })
  @IsBoolean()
  readonly EstadoIva: boolean;

  @IsOptional()
  @IsNotEmpty({ message: 'El precio de venta con descuento no debe ir vacio!' })
  @IsNumber()
  readonly PrecioVentaConDescuento: number | null;

  @IsNotEmpty({ message: 'El estado del descuento no debe ir vacio!' })
  @IsBoolean()
  readonly EstadoDescuento: boolean | null;
}
