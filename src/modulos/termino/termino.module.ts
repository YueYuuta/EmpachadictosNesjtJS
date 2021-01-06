import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminoController } from './api/termino.controller';
import { CrearTerminoCasoUso } from './termino-caso-uso/crear';
import { EliminarTerminoCasoUso } from './termino-caso-uso/eliminar';
import { TerminoRepoProvider } from './repository/termino-provider';
import { TerminoRepository } from './repository/termino.repository';
import { EditarTerminoCasoUso } from './termino-caso-uso/editar';
import { LeerTerminoCasoUso } from './termino-caso-uso/leer';

@Module({
  imports: [TypeOrmModule.forFeature([TerminoRepository])],
  providers: [
    CrearTerminoCasoUso,
    EditarTerminoCasoUso,
    LeerTerminoCasoUso,
    TerminoRepoProvider,
    EliminarTerminoCasoUso,
  ],
  controllers: [TerminoController],
  exports: [LeerTerminoCasoUso, TerminoRepoProvider],
})
export class TerminoModule {}
