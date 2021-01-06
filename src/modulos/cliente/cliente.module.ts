import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './api/cliente.controller';
import { CrearClienteCasoUso } from './cliente-caso-uso/crear';
import { EditarClienteCasoUso } from './cliente-caso-uso/editar';
import { EliminarClienteCasoUso } from './cliente-caso-uso/eliminar';
import { LeerClienteCasoUso } from './cliente-caso-uso/leer';
import { ClienteRepoProvider } from './repository/cliente-provider';
import { ClienteRepository } from './repository/cliente.repository';
import { EnlaceModule } from '../enlace/enlace.module';
import { ParroquiaModule } from '../parroquia/canton.module';
import { TerminoModule } from '../termino/termino.module';
import { PublicidadModule } from '@modulos/publicidad/publicidad.module';
import { AntiguoModule } from '../antiguo/publicidad.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClienteRepository]),
    EnlaceModule,
    ParroquiaModule,
    TerminoModule,
    PublicidadModule,
    AntiguoModule,
  ],
  providers: [
    CrearClienteCasoUso,
    EditarClienteCasoUso,
    LeerClienteCasoUso,
    ClienteRepoProvider,
    EliminarClienteCasoUso,
  ],
  controllers: [ClienteController],
  exports: [LeerClienteCasoUso],
})
export class ClienteModule {}
