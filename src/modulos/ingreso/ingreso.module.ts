import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '@modulos/shared/shared.module';

import { MenuModule } from '@modulos/menu/menu.module';
import { IngresoController } from './api/ingreso.controller';
import { ClienteModule } from '@modulos/cliente/cliente.module';
import { AlmacenModule } from '@modulos/almacen/almacen.module';
import { MenuAlmacenModule } from '@modulos/menu-almacen/menu-almacen.module';
import { DespacharModule } from '@modulos/despachar/despachar.module';
import { ProductoModule } from '@modulos/producto/producto.module';

import { ProductoAlmacenModule } from '@modulos/producto-almacen/producto-almacen.module';
import { IngresoRepository } from './repository/ingreso.repository';
import { IngresoDetalleRepository } from './repository/ingreso-detalle.repository';
import { CrearIngresoCasoUso } from './ingreso-caso-uso/crear';
import { IngresoRepoProvider } from './repository/ingreso-provider';
import { ProveedorModule } from '@modulos/proveedor/proveedor.module';
import { EditarIngresoCasoUso } from './ingreso-caso-uso/editar';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngresoRepository, IngresoDetalleRepository]),
    SharedModule,
    MenuModule,
    ClienteModule,
    AlmacenModule,
    MenuAlmacenModule,
    DespacharModule,
    ProductoModule,
    ProductoAlmacenModule,
    ProveedorModule,
  ],
  providers: [CrearIngresoCasoUso, IngresoRepoProvider, EditarIngresoCasoUso],
  controllers: [IngresoController],
  exports: [],
})
export class IngresoModule {}
