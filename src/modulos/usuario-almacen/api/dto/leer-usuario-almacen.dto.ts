import { IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { LeerUsuarioDto } from '@modulos/usuario/api/dto/leer-usuario.dto';
import { LeerAlmacenDto } from '@modulos/almacen/api/dto';

@Exclude()
export class LeerUsuarioAlmacenDto {
  @Expose()
  @IsNumber()
  readonly UsuarioAlmacenID: number;

  @Expose()
  @Type(type => LeerAlmacenDto)
  readonly Almacen: LeerAlmacenDto;

  @Expose()
  @Type(type => LeerUsuarioDto)
  readonly Usuario: LeerUsuarioDto;

  @Expose()
  readonly Fecha: string;
}
