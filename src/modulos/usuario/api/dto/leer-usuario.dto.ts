import { IsNumber, IsEmail, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { LeerUsuarioDetalleDto } from './leer-usuario-detalle.dto';
@Exclude()
export class LeerUsuarioDto {
  @Expose()
  @IsNumber()
  readonly UsuarioID: number;

  @Expose()
  @IsEmail()
  readonly Correo: string;

  @Expose()
  @IsEmail()
  readonly Rol: string;

  @Expose()
  @IsString()
  readonly Usuario: string;

  @Expose()
  @Type(type => LeerUsuarioDetalleDto)
  readonly Detalle: LeerUsuarioDetalleDto;

  @Expose()
  readonly NombreCompleto: string;

  @Expose()
  readonly Fecha: string;
}
