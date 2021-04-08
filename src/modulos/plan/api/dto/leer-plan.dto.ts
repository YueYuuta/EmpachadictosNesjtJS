import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LeerPlanDto {
  @Expose()
  readonly PlanID: number;

  @Expose()
  readonly Descripcion: string;

  @Expose()
  readonly Fecha: string;
}
