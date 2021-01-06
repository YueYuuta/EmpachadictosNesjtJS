import { Inject, Injectable } from '@nestjs/common';
import { IPlanCasoUso } from './IPlanCasoUso';

const PlanRepo = () => Inject('PlanRepo');

@Injectable()
export class EliminarPlanCasoUso {
  constructor(@PlanRepo() private readonly _planRepository: IPlanCasoUso) {}

  async eliminar(PlanID: number): Promise<boolean> {
    await this._planRepository.obtenerPodId(PlanID);
    return await this._planRepository.eliminar(PlanID);
  }
}
