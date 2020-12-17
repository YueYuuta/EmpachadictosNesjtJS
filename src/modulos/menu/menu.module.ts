import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './api/menu.controller';
import { SharedModule } from '@modulos/shared/shared.module';
import { MenuRepository } from './repository/menu.repository';
import { CrearMenuCasoUso } from './menu-caso-uso/crear';
import { LeerMenuCasoUso } from './menu-caso-uso/leer';
import { EditarMenuCasoUso } from './menu-caso-uso/editar';
import { MenuRepoProvider } from './repository/menu-provider';
import { EliminarMenuCasoUso } from './menu-caso-uso/eliminar';
import { ProductoModule } from '../producto/producto.module';
import { MenuDetalleRepository } from './repository/menu-detalle.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuRepository, MenuDetalleRepository]),
    SharedModule,
    ProductoModule,
  ],
  providers: [
    CrearMenuCasoUso,
    LeerMenuCasoUso,
    EditarMenuCasoUso,
    MenuRepoProvider,
    EliminarMenuCasoUso,
  ],
  controllers: [MenuController],
  exports: [],
})
export class MenuModule {}
