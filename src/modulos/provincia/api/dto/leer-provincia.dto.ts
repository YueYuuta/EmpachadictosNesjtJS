import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LeerProvinciaDto {
  @Expose()
  readonly ProvinciaID: number;

  @Expose()
  readonly Nombre: string;

  @Expose()
  readonly Fecha: string;
}
