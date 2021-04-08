import { EditarPlanDto } from '@modulos/plan/api/dto';
import { PlanModel } from '@modulos/plan/plan-caso-uso/models/plan';
import { Variables } from '@utils/manejo-variables/variables';

export class PlanMapper {
  public static editar(plan: EditarPlanDto): PlanModel {
    const partiaPlan: EditarPlanDto = {
      Descripcion: plan.Descripcion ?? null,
    };
    Object.keys(partiaPlan).forEach(
      key => partiaPlan[key] === null && delete partiaPlan[key],
    );
    const planLimpio: PlanModel = Variables.limpiarVariables(partiaPlan);

    return planLimpio;
  }

  public static crear(plan: EditarPlanDto): PlanModel {
    const partiaPlan: EditarPlanDto = {
      Descripcion: plan.Descripcion ?? null,
    };
    Object.keys(partiaPlan).forEach(
      key => partiaPlan[key] === null && delete partiaPlan[key],
    );
    const planLimpio: PlanModel = Variables.limpiarVariables(partiaPlan);

    return planLimpio;
  }
}
