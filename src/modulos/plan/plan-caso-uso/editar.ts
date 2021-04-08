import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IPlanCasoUso } from './IPlanCasoUso';
import { PlanModel } from './models/plan';

const PlanRepo = () => Inject('PlanRepo');

@Injectable()
export class EditarPlanCasoUso {
  constructor(@PlanRepo() private readonly _planRepository: IPlanCasoUso) {}

  async editar(plan: PlanModel, PlanID: number): Promise<boolean> {
    // plan.Descripcion = plan.Descripcion.toUpperCase();
    const nombrePlan = await this._planRepository.verificarNombreEditar(
      plan.Descripcion,
      PlanID,
    );
    if (nombrePlan) {
      throw new ConflictException(`La plan: ${plan.Descripcion}, ya existe!`);
    }
    await this._planRepository.obtenerPodId(PlanID);
    const planEditado: boolean = await this._planRepository.editar(
      plan,
      PlanID,
    );
    return planEditado;
  }
}
