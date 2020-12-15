import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { LeerRolPermisoDto } from './leer-rol-permiso.dto';
import { LeerPermisoDto } from './leer-permiso.dto';

@Exclude()
export class LeerRolDto {
  @Expose()
  @IsNumber()
  readonly RolID: number;

  @Expose()
  @IsString()
  readonly Nombre: string;

  @Expose()
  @Type(type => LeerRolPermisoDto)
  readonly RolPermiso: LeerPermisoDto[];

  @Expose()
  readonly Fecha: string;
}
