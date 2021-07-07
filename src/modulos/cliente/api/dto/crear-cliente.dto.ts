import { IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';
export class CrearClienteDto {
  @IsNotEmpty({ message: 'El nombre del cliente no debe ir vacio' })
  @IsString()
  @MaxLength(150, {
    message: 'El nombre del cliente debe tener menos de 150 caracteres',
  })
  readonly Nombre: string;

  // @IsOptional()
  // @IsNotEmpty({ message: 'La referencia del cliente no debe ir vacio' })
  // @IsString()
  // readonly Referencia: string;

  // @IsNotEmpty({ message: 'El enlace no debe ir vacio' })
  // @IsNumber()
  // readonly Enlace: number;

  // @IsNotEmpty({ message: 'La parroquia no debe ir vacio' })
  // @IsNumber()
  // readonly Parroquia: number;

  // @IsNotEmpty({ message: 'El termino no debe ir vacio' })
  // @IsNumber()
  // readonly Termino: number;

  // @IsOptional()
  // @IsNotEmpty({ message: 'La publicidad no debe ir vacio' })
  // @IsNumber()
  // readonly Publicidad: number;

  // @IsOptional()
  // @IsNotEmpty({ message: 'El servicio antiguo no debe ir vacio' })
  // @IsNumber()
  // readonly Antiguo: number;

  // @IsOptional()
  // @IsNotEmpty({ message: 'La dirreccion del cliente no debe ir vacio' })
  // @IsString()
  // readonly Direccion: string;

  @IsOptional()
  @IsNotEmpty({ message: 'El telefono del cliente no debe ir vacio' })
  @IsString()
  @MaxLength(10, {
    message: 'El telefono del cliente no debe tener 10 caracteres',
  })
  readonly Telefono: string;

  @IsOptional()
  @IsNotEmpty({ message: 'El correo del cliente no debe ir vacio' })
  @IsString()
  readonly Correo: string;

  @IsOptional()
  @IsNotEmpty({ message: 'El RUC del almacen no debe ir vacio' })
  @IsString()
  @MaxLength(13, {
    message: 'El ruc del cliente no debe tener 13 caracteres',
  })
  readonly Ruc: string;

  @IsOptional()
  @IsNotEmpty({ message: 'La cedula del almacen no debe ir vacio' })
  @IsString()
  @MaxLength(10, {
    message: 'La cedula del cliente no debe tener  10 caracteres',
  })
  readonly Cedula: string;

  @IsOptional()
  @IsNotEmpty({ message: 'El documento del almacen no debe ir vacio' })
  @IsString()
  readonly Otro: string;
}
