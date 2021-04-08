import { IsString, IsNotEmpty } from 'class-validator';
export class CrearPlanDto {
  @IsNotEmpty({ message: 'La descripcion no debe ir vacio' })
  @IsString()
  readonly Descripcion: string;
}
