import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { PlanModel } from './models/plan';
import { LeerPlanDto } from '../api/dto';
import { IPlanCasoUso } from './IPlanCasoUso';
import { Plan } from '../entidades/plan.entity';

const PlanRepo = () => Inject('PlanRepo');

@Injectable()
export class CrearPlanCasoUso {
  constructor(@PlanRepo() private readonly _planRepository: IPlanCasoUso) {}

  async crear(plan: PlanModel): Promise<LeerPlanDto> {
    // plan.Descripcion = plan.Descripcion.toUpperCase();
    const nombrePlan = await this._planRepository.verificarNombre(
      plan.Descripcion,
    );
    if (nombrePlan) {
      throw new ConflictException(`La plan: ${plan.Descripcion}, ya existe!`);
    }
    const planGuardado: Plan = await this._planRepository.crear(plan);
    return plainToClass(LeerPlanDto, planGuardado);
  }
}
