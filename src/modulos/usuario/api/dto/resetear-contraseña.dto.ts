import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ResetContraseñaDto {
  @IsNotEmpty({ message: 'Su contraseña no debe ir vacio!' })
  @IsString({ message: 'la contraseña debe ser string' })
  @MaxLength(20, {
    message:
      'La contraseña del usuario debe llevar un maximo de 20 caracteres!',
  })
  Contraseña: string;
}
