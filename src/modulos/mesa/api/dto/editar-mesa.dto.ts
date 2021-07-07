import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class EditarMesaDto {
  @IsNotEmpty({ message: 'La descripcion no debe ir vacio' })
  @IsString()
  readonly Descripcion: string;
}
