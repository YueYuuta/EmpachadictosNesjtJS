import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LeerClienteDto {
  @Expose()
  readonly ClienteID: number;

  @Expose()
  readonly Nombre: string;

  @Expose()
  readonly Direccion: string;

  @Expose()
  readonly Telefono: string;

  @Expose()
  readonly Correo: string;

  @Expose()
  readonly Ruc: string;

  @Expose()
  readonly Cedula: string;

  @Expose()
  readonly Otro: string;

  @Expose()
  readonly Compras: number;

  @Expose()
  readonly Fecha: string;
}
