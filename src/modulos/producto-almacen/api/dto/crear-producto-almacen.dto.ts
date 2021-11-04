import { IsNotEmpty, IsNumber } from 'class-validator';

export class CrearProductoAlmacenIngresoDto {
  @IsNotEmpty({ message: 'El ingreso no debe ir vacio!' })
  @IsNumber()
  readonly Ingreso: number;

  @IsNotEmpty({ message: 'El almacen no debe ir vacio!' })
  @IsNumber()
  readonly AlmacenID: number;

  @IsNotEmpty({ message: 'El producto no debe ir vacio!' })
  @IsNumber()
  readonly ProductoID: number;
}

export class CrearProductoAlmacenEgresoDto {
  @IsNotEmpty({ message: 'El egreso no debe ir vacio!' })
  @IsNumber()
  readonly Egreso: number;

  @IsNotEmpty({ message: 'El almacen no debe ir vacio!' })
  @IsNumber()
  readonly AlmacenID: number;

  @IsNotEmpty({ message: 'El ingreso no debe ir vacio!' })
  @IsNumber()
  readonly ProductoID: number;
}
