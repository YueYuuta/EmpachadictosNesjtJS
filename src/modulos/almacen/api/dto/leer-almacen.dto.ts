import { IsString, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LeerAlmacenDto {
  @Expose()
  @IsNumber()
  readonly AlmacenID: number;
  @Expose()
  @IsString()
  readonly NombreComercial: string;
  @Expose()
  @IsString()
  readonly RazonSocial: string;

  @Expose()
  @IsString()
  readonly Direccion: string;

  @Expose()
  @IsString()
  readonly Telefono: string;

  @Expose()
  @IsString()
  readonly Correo: string;

  @Expose()
  @IsString()
  readonly Ruc: string;

  @Expose()
  readonly Fecha: string;
}
