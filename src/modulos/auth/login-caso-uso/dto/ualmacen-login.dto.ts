import { IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { LeerAlmacenDto } from '@modulos/almacen/api/dto';

@Exclude()
export class LeerUAlmacenLoginDto {
  @Expose()
  @IsNumber()
  readonly UsuarioAlmacenID: number;

  @Expose()
  @Type(type => LeerAlmacenDto)
  readonly Almacen: LeerAlmacenDto;
}
