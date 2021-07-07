import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MesaController } from './api/mesa.controller';
import { CrearMesaCasoUso } from './mesa-caso-uso/crear';
import { EliminarMesaCasoUso } from './mesa-caso-uso/eliminar';
import { MesaRepoProvider } from './repository/mesa-provider';
import { MesaRepository } from './repository/mesa.repository';
import { EditarMesaCasoUso } from './mesa-caso-uso/editar';
import { LeerMesaCasoUso } from './mesa-caso-uso/leer';

@Module({
  imports: [TypeOrmModule.forFeature([MesaRepository])],
  providers: [
    CrearMesaCasoUso,
    EditarMesaCasoUso,
    LeerMesaCasoUso,
    MesaRepoProvider,
    EliminarMesaCasoUso,
  ],
  controllers: [MesaController],
  exports: [LeerMesaCasoUso, MesaRepoProvider],
})
export class MesaModule {}
