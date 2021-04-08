import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class EditarParroquiaDto {
  @IsNotEmpty({ message: 'El nombre no debe ir vacio!' })
  @IsString()
  readonly Nombre: string;

  @IsNotEmpty({ message: 'El canton no debe ir vacia!' })
  @IsNumber()
  readonly Canton: number;
}
