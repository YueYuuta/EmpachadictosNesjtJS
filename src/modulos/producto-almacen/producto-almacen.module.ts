import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductoModule } from '@modulos/producto/producto.module';
import { AlmacenModule } from '@modulos/almacen/almacen.module';
import { ProductoAlmacenRepository } from './repository/producto-almacen.repository';
import { SharedModule } from '@modulos/shared/shared.module';
import { CrearProductoAlmacenCasoUso } from './producto-almacen-caso-uso/crear';
import { LeerProductoAlmacenCasoUso } from './producto-almacen-caso-uso/leer';
import { ProductoAlmacenRepoProvider } from './repository/producto-almacen-provider';
import { EliminarProductoAlmacenCasoUso } from './producto-almacen-caso-uso/eliminar';
import { ProductoAlmacenController } from './api/producto-almacen.controller';
import { ProductoAlmacenDetalle } from './entidates/producto-almacen-detalle.entity';
import { EditarProductoAlmacenCasoUso } from './producto-almacen-caso-uso/editar';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductoAlmacenRepository,
      ProductoAlmacenDetalle,
    ]),
    SharedModule,
    ProductoModule,
    AlmacenModule,
  ],
  providers: [
    CrearProductoAlmacenCasoUso,
    LeerProductoAlmacenCasoUso,
    ProductoAlmacenRepoProvider,
    EliminarProductoAlmacenCasoUso,
    EditarProductoAlmacenCasoUso,
  ],
  controllers: [ProductoAlmacenController],
  exports: [
    LeerProductoAlmacenCasoUso,
    CrearProductoAlmacenCasoUso,
    EditarProductoAlmacenCasoUso,
    EliminarProductoAlmacenCasoUso,
  ],
})
export class ProductoAlmacenModule {}
