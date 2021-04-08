import { IsString, IsNotEmpty } from 'class-validator';
export class EditarProvinciaDto {
  @IsNotEmpty({ message: 'El nombre no debe ir vacio' })
  @IsString()
  readonly Nombre: string;
}
