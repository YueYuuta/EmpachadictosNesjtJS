import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicidadController } from './api/publicidad.controller';
import { CrearPublicidadCasoUso } from './publicidad-caso-uso/crear';
import { EliminarPublicidadCasoUso } from './publicidad-caso-uso/eliminar';
import { PublicidadRepoProvider } from './repository/publicidad-provider';
import { PublicidadRepository } from './repository/publicidad.repository';
import { EditarPublicidadCasoUso } from './publicidad-caso-uso/editar';
import { LeerPublicidadCasoUso } from './publicidad-caso-uso/leer';

@Module({
  imports: [TypeOrmModule.forFeature([PublicidadRepository])],
  providers: [
    CrearPublicidadCasoUso,
    EditarPublicidadCasoUso,
    LeerPublicidadCasoUso,
    PublicidadRepoProvider,
    EliminarPublicidadCasoUso,
  ],
  controllers: [PublicidadController],
  exports: [LeerPublicidadCasoUso, PublicidadRepoProvider],
})
export class PublicidadModule {}
