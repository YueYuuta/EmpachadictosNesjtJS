import { IsString, IsNotEmpty, IsInt } from 'class-validator';
export class CrearTerminoDto {
  @IsNotEmpty({ message: 'La descripcion no debe ir vacio' })
  @IsString()
  readonly Descripcion: string;

  @IsNotEmpty({ message: 'Los dias no debe ir vacio' })
  @IsInt()
  readonly Dias: number;
}
