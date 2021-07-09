import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '@modulos/shared/shared.module';
import { DespacharRepository } from './repository/despachar.repository';

import { DespacharRepoProvider } from './repository/despachar-provider';
import { DespacharDetalleRepository } from './repository/despachar-detalle.repository';
import { CrearDespacharCasoUso } from './pedido-caso-uso/crear';
import { DespacharGateway } from './gateway/pedido.gateway';

import { DespacharController } from './api/despachar.controller';

import { LeerDespacharCasoUso } from './pedido-caso-uso/leer';

@Module({
  imports: [
    TypeOrmModule.forFeature([DespacharRepository, DespacharDetalleRepository]),
    SharedModule,
  ],
  providers: [
    CrearDespacharCasoUso,
    LeerDespacharCasoUso,
    DespacharRepoProvider,
    DespacharGateway,
  ],
  controllers: [DespacharController],
  exports: [CrearDespacharCasoUso],
})
export class DespacharModule {}
