import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LeerTerminoDto {
  @Expose()
  readonly TerminoID: number;

  @Expose()
  readonly Descripcion: string;

  @Expose()
  readonly Dias: number;

  @Expose()
  readonly Fecha: string;
}
