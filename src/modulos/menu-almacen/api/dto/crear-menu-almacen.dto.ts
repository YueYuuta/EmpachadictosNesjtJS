import { IsNotEmpty, IsNumber } from 'class-validator';

export class CrearMenuAlmacenIngresoDto {
  @IsNotEmpty({ message: 'El ingreso no debe ir vacio!' })
  @IsNumber()
  readonly Ingreso: number;

  @IsNotEmpty({ message: 'El almacen no debe ir vacio!' })
  @IsNumber()
  readonly AlmacenID: number;

  @IsNotEmpty({ message: 'El ingreso no debe ir vacio!' })
  @IsNumber()
  readonly MenuID: number;
}

export class CrearMenuAlmacenEgresoDto {
  @IsNotEmpty({ message: 'El egreso no debe ir vacio!' })
  @IsNumber()
  readonly Egreso: number;

  @IsNotEmpty({ message: 'El almacen no debe ir vacio!' })
  @IsNumber()
  readonly AlmacenID: number;

  @IsNotEmpty({ message: 'El ingreso no debe ir vacio!' })
  @IsNumber()
  readonly MenuID: number;
}
