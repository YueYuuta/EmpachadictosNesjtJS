import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Su usuario no debe ir vacio!' })
  @IsString({ message: 'El usuario debe ser string' })
  @MaxLength(20, {
    message: 'El nombre de usuario debe llevar un maximo de 20 caracteres!',
  })
  readonly Usuario: string;
  @IsNotEmpty({ message: 'Su contraseña no debe ir vacio!' })
  @IsString({ message: 'la contraseña debe ser string' })
  @MaxLength(20, {
    message:
      'La contraseña del usuario debe llevar un maximo de 20 caracteres!',
  })
  readonly Contraseña: string;
}
