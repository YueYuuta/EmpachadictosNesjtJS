import { IsString, IsNotEmpty } from 'class-validator';
export class EditarPlanDto {
  @IsNotEmpty({ message: 'La descripcion no debe ir vacio' })
  @IsString()
  readonly Descripcion: string;
}
