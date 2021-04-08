import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanController } from './api/plan.controller';
import { CrearPlanCasoUso } from './plan-caso-uso/crear';
import { EliminarPlanCasoUso } from './plan-caso-uso/eliminar';
import { PlanRepoProvider } from './repository/plan-provider';
import { PlanRepository } from './repository/plan.repository';
import { EditarPlanCasoUso } from './plan-caso-uso/editar';
import { LeerPlanCasoUso } from './plan-caso-uso/leer';

@Module({
  imports: [TypeOrmModule.forFeature([PlanRepository])],
  providers: [
    CrearPlanCasoUso,
    EditarPlanCasoUso,
    LeerPlanCasoUso,
    PlanRepoProvider,
    EliminarPlanCasoUso,
  ],
  controllers: [PlanController],
  exports: [LeerPlanCasoUso, PlanRepoProvider],
})
export class PlanModule {}
