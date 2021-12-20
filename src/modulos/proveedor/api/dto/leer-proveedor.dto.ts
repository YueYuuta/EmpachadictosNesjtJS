import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class LeerProveedorDto {
  @Expose()
  readonly ProveedorID: number;

  @Expose()
  readonly Nombre: string;

  @Expose()
  readonly Telefono: string;

  @Expose()
  readonly Correo: string;

  @Expose()
  readonly Ruc: string;

  @Expose()
  readonly Fecha: string;

  @Expose()
  readonly Direccion: string;
}
