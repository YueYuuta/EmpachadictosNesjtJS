import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class LeerUsuarioDetalleDto {
  @Expose()
  @IsNumber()
  readonly UsuarioDetalleID: number;

  @Expose()
  @IsString()
  readonly Avatar: string;

  @Expose()
  @IsString()
  readonly Nombres: string;

  @Expose()
  @IsString()
  readonly Apellidos: string;
}
