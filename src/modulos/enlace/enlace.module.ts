import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnlaceController } from './api/enlace.controller';
import { CrearEnlaceCasoUso } from './enlace-caso-uso/crear';
import { EliminarEnlaceCasoUso } from './enlace-caso-uso/eliminar';
import { EnlaceRepoProvider } from './repository/enlace-provider';
import { EnlaceRepository } from './repository/enlace.repository';
import { EditarEnlaceCasoUso } from './enlace-caso-uso/editar';
import { LeerEnlaceCasoUso } from './enlace-caso-uso/leer';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [TypeOrmModule.forFeature([EnlaceRepository]), PlanModule],
  providers: [
    CrearEnlaceCasoUso,
    EditarEnlaceCasoUso,
    LeerEnlaceCasoUso,
    EnlaceRepoProvider,
    EliminarEnlaceCasoUso,
  ],
  controllers: [EnlaceController],
  exports: [LeerEnlaceCasoUso, EnlaceRepoProvider],
})
export class EnlaceModule {}
