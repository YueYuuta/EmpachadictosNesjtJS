import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
export class CrearCategoriaDto {
  @IsNotEmpty({ message: 'El nombre no debe ir vacio' })
  @IsString()
  @MaxLength(150, {
    message: 'El nombre debe tener menos de 150 caracteres',
  })
  readonly Nombre: string;
}
