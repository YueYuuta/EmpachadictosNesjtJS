import { IsNotEmpty, IsNumber } from 'class-validator';
export class CrearUsuarioAlmacenDto {
  @IsNotEmpty({ message: 'El usuario no debe ir vacio' })
  @IsNumber()
  readonly Usuario: number;

  @IsNotEmpty({ message: 'El almacen no debe ir vacio' })
  @IsNumber()
  readonly Almacen: number;
}
