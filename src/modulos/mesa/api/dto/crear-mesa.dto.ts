import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CrearMesaDto {
  @IsNotEmpty({ message: 'La descripcion no debe ir vacio' })
  @IsString()
  readonly Descripcion: string;

  @IsNotEmpty({ message: 'El almacen no debe ir vacio!' })
  @IsNumber()
  readonly AlmacenID: number;
}
