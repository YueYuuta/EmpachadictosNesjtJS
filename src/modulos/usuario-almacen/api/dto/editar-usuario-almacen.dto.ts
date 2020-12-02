import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class EditarUsuarioAlmacenDto {
  @IsOptional()
  @IsNotEmpty({ message: 'El usuario no debe ir vacio' })
  @IsNumber()
  readonly Usuario: number;
  @IsOptional()
  @IsNotEmpty({ message: 'El almacen no debe ir vacio' })
  @IsNumber()
  readonly Almacen: number;
}
