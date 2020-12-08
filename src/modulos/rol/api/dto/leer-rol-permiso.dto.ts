import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { LeerPermisoDto } from './leer-permiso.dto';

@Exclude()
export class LeerRolPermisoDto {
  @Expose()
  @IsNumber()
  readonly RolPermisoID: number;

  @Expose()
  @IsString()
  readonly Nombre: string;

  @Expose()
  @Type(type => LeerPermisoDto)
  readonly Permiso: LeerPermisoDto;

  @Expose()
  readonly Fecha: string;
}
