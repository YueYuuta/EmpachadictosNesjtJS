import { LeerMenuDto } from '@modulos/menu/api/dto';
import { Menu } from '@modulos/menu/entidates/menu.entity';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LeerMenuAlmacenDto {
  @Expose()
  readonly MenuAlmacenID: number;

  @Expose()
  @Type(type => Menu)
  readonly MenuID: LeerMenuDto[];

  @Expose()
  readonly Ingreso: number;

  @Expose()
  readonly Egreso: number;

  @Expose()
  readonly Fecha: string;
}
