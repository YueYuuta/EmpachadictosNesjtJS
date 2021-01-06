import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinciaController } from './api/provincia.controller';
import { CrearProvinciaCasoUso } from './provincia-caso-uso/crear';
import { EliminarProvinciaCasoUso } from './provincia-caso-uso/eliminar';
import { ProvinciaRepoProvider } from './repository/provincia-provider';
import { ProvinciaRepository } from './repository/provincia.repository';
import { EditarProvinciaCasoUso } from './provincia-caso-uso/editar';
import { LeerProvinciaCasoUso } from './provincia-caso-uso/leer';

@Module({
  imports: [TypeOrmModule.forFeature([ProvinciaRepository])],
  providers: [
    CrearProvinciaCasoUso,
    EditarProvinciaCasoUso,
    LeerProvinciaCasoUso,
    ProvinciaRepoProvider,
    EliminarProvinciaCasoUso,
  ],
  controllers: [ProvinciaController],
  exports: [LeerProvinciaCasoUso, ProvinciaRepoProvider],
})
export class ProvinciaModule {}
