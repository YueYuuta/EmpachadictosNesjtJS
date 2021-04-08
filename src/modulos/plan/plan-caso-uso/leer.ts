import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerPlanDto } from '../api/dto';
import { IPlanCasoUso } from './IPlanCasoUso';

const PlanRepo = () => Inject('PlanRepo');

@Injectable()
export class LeerPlanCasoUso {
  constructor(@PlanRepo() private readonly _planRepository: IPlanCasoUso) {}

  async obtenerProId(PlanID: number): Promise<LeerPlanDto> {
    const plan = await this._planRepository.obtenerPodId(PlanID);
    return plainToClass(LeerPlanDto, plan);
  }

  async obtener(): Promise<LeerPlanDto[]> {
    const planes: LeerPlanDto[] = await this._planRepository.obtener();
    return planes.map((plan: LeerPlanDto) => plainToClass(LeerPlanDto, plan));
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerPlanDto[]> {
    let planes: any;
    if (termino) {
      termino = termino.trim();
      planes = await this._planRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      planes = await this._planRepository.obtenerPaginado(desde, limite);
    }
    return planes.map((plan: any) => plainToClass(LeerPlanDto, plan));
  }
}
