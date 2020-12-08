import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LeerModuloDto {
  @Expose()
  @IsNumber()
  readonly ModuloID: number;

  @Expose()
  @IsString()
  readonly Nombre: string;

  @Expose()
  @IsString()
  readonly Icono: string;
}
