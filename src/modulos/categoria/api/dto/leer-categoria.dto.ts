import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LeerCategoriaDto {
  @Expose()
  readonly CategoriaID: number;

  @Expose()
  readonly Nombre: string;

  @Expose()
  readonly Fecha: string;

  @Expose()
  readonly Imagen: string;
}
