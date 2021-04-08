import { IsString, IsNotEmpty } from 'class-validator';
export class EditarPublicidadDto {
  @IsNotEmpty({ message: 'La descripcion no debe ir vacio' })
  @IsString()
  readonly Descripcion: string;
}
