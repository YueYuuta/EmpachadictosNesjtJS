import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoController } from './api/producto.controller';
import { CrearProductoCasoUso } from './producto-caso-uso/crear';
import { EliminarProductoCasoUso } from './producto-caso-uso/eliminar';
import { ProductoRepoProvider } from './repository/producto-provider';
import { ProductoRepository } from './repository/producto.repository';
import { LeerProductoCasoUso } from './producto-caso-uso/leer';
import { EditarProductoCasoUso } from './producto-caso-uso/editar';
import { SharedModule } from '@modulos/shared/shared.module';
import { CategoriaModule } from '@modulos/categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductoRepository]),
    SharedModule,
    CategoriaModule,
  ],
  providers: [
    CrearProductoCasoUso,
    LeerProductoCasoUso,
    EditarProductoCasoUso,
    ProductoRepoProvider,
    EliminarProductoCasoUso,
  ],
  controllers: [ProductoController],
  exports: [LeerProductoCasoUso],
})
export class ProductoModule {}
