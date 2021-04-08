import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CantonController } from './api/canton.controller';
import { CrearCantonCasoUso } from './canton-caso-uso/crear';
import { EliminarCantonCasoUso } from './canton-caso-uso/eliminar';
import { CantonRepoProvider } from './repository/canton-provider';
import { CantonRepository } from './repository/canton.repository';
import { EditarCantonCasoUso } from './canton-caso-uso/editar';
import { LeerCantonCasoUso } from './canton-caso-uso/leer';
import { ProvinciaModule } from '@modulos/provincia/provincia.module';

@Module({
  imports: [TypeOrmModule.forFeature([CantonRepository]), ProvinciaModule],
  providers: [
    CrearCantonCasoUso,
    EditarCantonCasoUso,
    LeerCantonCasoUso,
    CantonRepoProvider,
    EliminarCantonCasoUso,
  ],
  controllers: [CantonController],
  exports: [LeerCantonCasoUso, CantonRepoProvider],
})
export class CantonModule {}
