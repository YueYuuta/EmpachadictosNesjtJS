import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntiguoController } from './api/antiguo.controller';
import { CrearAntiguoCasoUso } from './antiguo-caso-uso/crear';
import { EliminarAntiguoCasoUso } from './antiguo-caso-uso/eliminar';
import { AntiguoRepoProvider } from './repository/antiguo-provider';
import { AntiguoRepository } from './repository/antiguo.repository';
import { EditarAntiguoCasoUso } from './antiguo-caso-uso/editar';
import { LeerAntiguoCasoUso } from './antiguo-caso-uso/leer';

@Module({
  imports: [TypeOrmModule.forFeature([AntiguoRepository])],
  providers: [
    CrearAntiguoCasoUso,
    EditarAntiguoCasoUso,
    LeerAntiguoCasoUso,
    AntiguoRepoProvider,
    EliminarAntiguoCasoUso,
  ],
  controllers: [AntiguoController],
  exports: [LeerAntiguoCasoUso, AntiguoRepoProvider],
})
export class AntiguoModule {}
