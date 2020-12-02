import { IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';
export class EditarAlmacenDto {
  @IsOptional()
  @IsNotEmpty({ message: 'La razon social del almacen no debe ir vacio' })
  @IsString()
  @MaxLength(150, {
    message: 'La razon social del almacen debe tener menos de 150 caracteres',
  })
  readonly RazonSocial: string;
  @IsOptional()
  @IsNotEmpty({ message: 'El nombre comercial del almacen no debe ir vacio' })
  @IsString()
  @MaxLength(150, {
    message:
      'El nombre comercial del almacen debe tener menos de 150 caracteres',
  })
  readonly NombreComercial: string;
  @IsOptional()
  @IsNotEmpty({ message: 'La direccion del almacen no debe ir vacio' })
  @IsString()
  readonly Direccion: string;
  @IsOptional()
  @IsNotEmpty({ message: 'El telefono del almacen no debe ir vacio' })
  @IsString()
  @MaxLength(10, {
    message: 'El telefono del almacen no debe tener mas de 10 caracteres',
  })
  readonly Telefono: string;
  @IsOptional()
  @IsNotEmpty({ message: 'El correo del almacen no debe ir vacio' })
  @IsString()
  readonly Correo: string;

  @IsOptional()
  @IsNotEmpty({ message: 'El RUC del almacen no debe ir vacio' })
  @IsString()
  readonly Ruc: string;
}
