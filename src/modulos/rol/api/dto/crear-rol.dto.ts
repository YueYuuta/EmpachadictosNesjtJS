import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CrearRolPermisoDto } from './crear-rol-permiso.dto';
export class CrearRolDto {
  @IsNotEmpty({ message: 'El nombre no debe ir vacio' })
  @IsString()
  readonly Nombre: string;

  @IsNotEmpty({ message: 'Los permisos no debe ir vacios' })
  @IsArray({ message: 'Los permisos deben ser un array' })
  readonly RolPermiso: CrearRolPermisoDto[];
}
