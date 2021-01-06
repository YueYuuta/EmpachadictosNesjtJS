import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class EditarEnlaceDto {
  @IsNotEmpty({ message: 'El nombre no debe ir vacio!' })
  @IsString()
  readonly Descripcion: string;

  @IsNotEmpty({ message: 'El plan no debe ir vacia!' })
  @IsNumber()
  readonly Plan: number;

  @IsNotEmpty({ message: 'El nombre no debe ir vacio!' })
  @IsString()
  readonly VelocidadSubida: string;

  @IsNotEmpty({ message: 'El nombre no debe ir vacio!' })
  @IsString()
  readonly VelocidadBajada: string;

  @IsNotEmpty({ message: 'El precio no debe ir vacia!' })
  @IsNumber()
  readonly Precio: number;
}
