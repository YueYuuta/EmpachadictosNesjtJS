import { IsNumber } from 'class-validator';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class EditarUsuarioDto {
  @IsOptional()
  @IsString({ message: 'El nombre del usuario debe ser string!' })
  @MaxLength(20, {
    message: 'El nombre de usuario debe llevar un maximo de 20 caracteres!',
  })
  @Matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ_]+$/, {
    message:
      'El nombre de usuario no debe llevar espacios ni caracteres especiales!',
  })
  Usuario: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsString({ message: 'El correo del usuario debe ser string!' })
  @MaxLength(150, {
    message: 'El correo del usuario debe llevar un maximo de 150 caracteres!',
  })
  Correo: string | null;

  @IsOptional()
  @IsNotEmpty({ message: 'El rol del usuario no debe ir vacio!' })
  Rol: number | null;

  // @IsOptional()
  // @IsString({ message: 'la contraseña del usuario debe ser string!' })
  // @MaxLength(20, {
  //   message:
  //     'La contraseña del usuario debe llevar un maximo de 20 caracteres!',
  // })
  // Contraseña: string | null;

  @IsOptional()
  @IsString({ message: 'Los nombres del usuario debe ser string!' })
  @MaxLength(150, {
    message: 'los nombres del usuario debe llevar un maximo de 150 caracteres!',
  })
  Nombres: string | null;

  @IsOptional()
  @IsString({ message: 'Los apellidos del usuario debe ser string!' })
  @MaxLength(150, {
    message:
      'los apellidos del usuario debe llevar un maximo de 150 caracteres!',
  })
  Apellidos: string | null;
}
