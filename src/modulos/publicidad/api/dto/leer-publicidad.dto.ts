import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LeerPublicidadDto {
  @Expose()
  readonly PublicidadID: number;

  @Expose()
  readonly Descripcion: string;

  @Expose()
  readonly Fecha: string;
}
