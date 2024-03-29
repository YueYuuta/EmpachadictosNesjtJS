import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '@modulos/shared/shared.module';
import { PedidoRepository } from './repository/pedido.repository';

import { PedidoRepoProvider } from './repository/pedido-provider';
import { PedidoDetalleRepository } from './repository/pedido-detalle.repository';
import { CrearPedidoCasoUso } from './pedido-caso-uso/crear';
import { PedidoGateway } from './gateway/pedido.gateway';

import { MenuModule } from '@modulos/menu/menu.module';
import { PedidoController } from './api/pedido.controller';
import { ClienteModule } from '@modulos/cliente/cliente.module';
import { AlmacenModule } from '@modulos/almacen/almacen.module';
import { MenuAlmacenModule } from '@modulos/menu-almacen/menu-almacen.module';
import { DespacharModule } from '@modulos/despachar/despachar.module';
import { ProductoModule } from '@modulos/producto/producto.module';
import { LeerPedidoCasoUso } from './pedido-caso-uso/leer';
import { EditarPedidoCasoUso } from './pedido-caso-uso/editar';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoRepository, PedidoDetalleRepository]),
    SharedModule,
    MenuModule,
    ClienteModule,
    AlmacenModule,
    MenuAlmacenModule,
    DespacharModule,
    ProductoModule,
  ],
  providers: [
    CrearPedidoCasoUso,
    PedidoRepoProvider,
    PedidoGateway,
    LeerPedidoCasoUso,
    EditarPedidoCasoUso,
  ],
  controllers: [PedidoController],
  exports: [],
})
export class PedidoModule {}
