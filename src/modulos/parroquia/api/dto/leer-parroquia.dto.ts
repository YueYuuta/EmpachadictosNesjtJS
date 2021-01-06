import { LeerCantonDto } from '@modulos/canton/api/dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LeerParroquiaDto {
  @Expose()
  readonly ParroquiaID: number;

  @Expose()
  readonly Nombre: string;

  @Expose()
  @Type(type => LeerCantonDto)
  readonly Canton: LeerCantonDto;

  @Expose()
  readonly Fecha: string;
}
