import { LeerProvinciaDto } from '@modulos/provincia/api/dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LeerCantonDto {
  @Expose()
  readonly CantonID: number;

  @Expose()
  readonly Nombre: string;

  @Expose()
  @Type(type => LeerProvinciaDto)
  readonly Provincia: LeerProvinciaDto;

  @Expose()
  readonly Fecha: string;
}
