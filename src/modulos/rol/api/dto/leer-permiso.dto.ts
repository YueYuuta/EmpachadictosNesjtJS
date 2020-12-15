import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { LeerModuloDto } from './leer-modulo.dto';

@Exclude()
export class LeerPermisoDto {
  @Expose()
  @IsNumber()
  readonly PermisoID: number;

  @Expose()
  @Type(type => LeerModuloDto)
  readonly Modulo: LeerModuloDto;

  @Expose()
  @IsString()
  readonly Ruta: string;

  @Expose()
  @IsString()
  readonly Icono: string;

  @Expose()
  @IsString()
  readonly Titulo: string;

  @Expose()
  @IsString()
  readonly Descripcion: string;

  @Expose()
  readonly Menu: boolean;
}
