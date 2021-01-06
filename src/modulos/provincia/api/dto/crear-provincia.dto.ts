import { IsString, IsNotEmpty } from 'class-validator';
export class CrearProvinciaDto {
  @IsNotEmpty({ message: 'El nombre no debe ir vacio' })
  @IsString()
  readonly Nombre: string;
}
