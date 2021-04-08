import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CrearEnlaceDto {
  @IsNotEmpty({ message: 'El nombre no debe ir vacio!' })
  @IsString()
  readonly Descripcion: string;

  @IsNotEmpty({ message: 'El plan no debe ir vacia!' })
  @IsNumber()
  readonly Plan: number;

  @IsNotEmpty({ message: 'La velocidad de subida no debe ir vacio!' })
  @IsString()
  readonly VelocidadSubida: string;

  @IsNotEmpty({ message: 'La velocidad de bajada no debe ir vacio!' })
  @IsString()
  readonly VelocidadBajada: string;

  @IsNotEmpty({ message: 'El precio no debe ir vacia!' })
  @IsNumber()
  readonly Precio: number;
}
