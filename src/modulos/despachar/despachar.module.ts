import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '@modulos/shared/shared.module';
import { DespacharRepository } from './repository/despachar.repository';

import { DespacharRepoProvider } from './repository/despachar-provider';
import { DespacharDetalleRepository } from './repository/despachar-detalle.repository';
import { CrearDespacharCasoUso } from './pedido-caso-uso/crear';
import { DespacharGateway } from './gateway/despachar.gateway';

import { DespacharController } from './api/despachar.controller';

import { LeerDespacharCasoUso } from './pedido-caso-uso/leer';
import { EditarDespacharCasoUso } from './pedido-caso-uso/editar';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([DespacharRepository, DespacharDetalleRepository]),
    SharedModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    CrearDespacharCasoUso,
    LeerDespacharCasoUso,
    DespacharRepoProvider,
    EditarDespacharCasoUso,
    DespacharGateway,
  ],
  controllers: [DespacharController],
  exports: [CrearDespacharCasoUso],
})
export class DespacharModule {}
