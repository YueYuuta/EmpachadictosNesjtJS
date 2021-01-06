import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LeerAntiguoDto {
  @Expose()
  readonly AntiguoID: number;

  @Expose()
  readonly Descripcion: string;

  @Expose()
  readonly Fecha: string;
}
