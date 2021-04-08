import { Exclude, Expose, Type } from 'class-transformer';
import { LeerPlanDto } from '@modulos/plan/api/dto/leer-plan.dto';

@Exclude()
export class LeerEnlaceDto {
  @Expose()
  readonly EnlaceID: number;

  @Expose()
  readonly Descripcion: string;

  @Expose()
  readonly VelocidadSubida: string;

  @Expose()
  readonly VelocidadBajada: string;

  @Expose()
  readonly Precio: number;

  @Expose()
  @Type(type => LeerPlanDto)
  readonly Plan: LeerPlanDto;

  @Expose()
  readonly Fecha: string;
}
