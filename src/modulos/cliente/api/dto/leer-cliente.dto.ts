import { LeerPublicidadDto } from '@modulos/publicidad/api/dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { LeerEnlaceDto } from '../../../enlace/api/dto/leer-enlace.dto';
import { LeerParroquiaDto } from '../../../parroquia/api/dto/leer-parroquia.dto';
import { LeerTerminoDto } from '../../../termino/api/dto/leer-termino.dto';
import { LeerAntiguoDto } from '../../../antiguo/api/dto/leer-publicidad.dto';

@Exclude()
export class LeerClienteDto {
  @Expose()
  readonly ClienteID: number;

  @Expose()
  readonly Nombre: string;

  @Expose()
  readonly Referencia: string;

  @Expose()
  @Type(type => LeerEnlaceDto)
  readonly Enlace: LeerEnlaceDto;

  @Expose()
  @Type(type => LeerParroquiaDto)
  readonly Parroquia: LeerParroquiaDto;

  @Expose()
  @Type(type => LeerTerminoDto)
  readonly Termino: LeerTerminoDto;

  @Expose()
  @Type(type => LeerPublicidadDto)
  readonly Publicidad: LeerPublicidadDto;

  @Expose()
  @Type(type => LeerAntiguoDto)
  readonly Antiguo: LeerAntiguoDto;

  @Expose()
  readonly Direccion: string;

  @Expose()
  readonly Telefono: string;

  @Expose()
  readonly Correo: string;

  @Expose()
  readonly Ruc: string;

  @Expose()
  readonly Cedula: string;

  @Expose()
  readonly Otro: string;

  @Expose()
  readonly Compras: number;

  @Expose()
  readonly Fecha: string;
}
