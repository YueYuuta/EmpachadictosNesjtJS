import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuAlmacenController } from './api/menu-almacen.controller';
import { SharedModule } from '@modulos/shared/shared.module';
import { MenuAlmacenRepository } from './repository/menu-almacen.repository';
import { CrearMenuAlmacenCasoUso } from './menu-almacen-caso-uso/crear';
import { LeerMenuAlmacenCasoUso } from './menu-almacen-caso-uso/leer';
import { MenuAlmacenRepoProvider } from './repository/menu-almacen-provider';
import { EliminarMenuAlmacenCasoUso } from './menu-almacen-caso-uso/eliminar';

import { MenuModule } from '@modulos/menu/menu.module';
import { AlmacenModule } from '@modulos/almacen/almacen.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuAlmacenRepository]),
    SharedModule,
    MenuModule,
    AlmacenModule,
  ],
  providers: [
    CrearMenuAlmacenCasoUso,
    LeerMenuAlmacenCasoUso,
    MenuAlmacenRepoProvider,
    EliminarMenuAlmacenCasoUso,
  ],
  controllers: [MenuAlmacenController],
  exports: [LeerMenuAlmacenCasoUso, CrearMenuAlmacenCasoUso],
})
export class MenuAlmacenModule {}
