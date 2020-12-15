import {
  IsNotEmpty,
  isNumber,
  IsString,
  Matches,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CrearUsuarioDto {
  @IsNotEmpty({ message: 'El nombre del usuario no debe ir vacio!' })
  @IsString({ message: 'El nombre del usuario debe ser string!' })
  @MaxLength(20, {
    message: 'El nombre de usuario debe llevar un maximo de 20 caracteres!',
  })
  @Matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ_]+$/, {
    message:
      'El nombre de usuario no debe llevar espacios ni caracteres especiales!',
  })
  Usuario: string;

  @IsNotEmpty({ message: 'El correo del usuario no debe ir vacio!' })
  @IsString({ message: 'El correo del usuario debe ser string!' })
  @MaxLength(150, {
    message: 'El correo del usuario debe llevar un maximo de 150 caracteres!',
  })
  Correo: string;

  @IsNotEmpty({ message: 'El rol del usuario no debe ir vacio!' })
  Rol: number;

  @IsNotEmpty({ message: 'la contraseña del usuario no debe ir vacio!' })
  @IsString({ message: 'la contraseña del usuario debe ser string!' })
  @MaxLength(20, {
    message:
      'La contraseña del usuario debe llevar un maximo de 20 caracteres!',
  })
  Contraseña: string;

  @IsNotEmpty({ message: 'Los nombres del usuario no debe ir vacio!' })
  @IsString({ message: 'Los nombres del usuario debe ser string!' })
  @MaxLength(150, {
    message: 'los nombres del usuario debe llevar un maximo de 150 caracteres!',
  })
  Nombres: string;

  @IsNotEmpty({ message: 'Los apellidos del usuario no debe ir vacio!' })
  @IsString({ message: 'Los apellidos del usuario debe ser string!' })
  @MaxLength(150, {
    message:
      'los apellidos del usuario debe llevar un maximo de 150 caracteres!',
  })
  Apellidos: string;
}
