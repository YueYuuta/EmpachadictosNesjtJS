import { EntityRepository, Repository } from 'typeorm';
import { Plan } from '@modulos/plan/entidades/plan.entity';

@EntityRepository(Plan)
export class PlanRepository extends Repository<Plan> {}
