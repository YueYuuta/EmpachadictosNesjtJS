import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlmacenRepository } from './repository/almacen.repository';
import { CrearAlmacenCasoUso } from './almacen-caso-uso/crear';
import { EditarAlmacenCasoUso } from './almacen-caso-uso/editar';
import { LeerAlmacenCasoUso } from './almacen-caso-uso/leer';
import { AlmacenController } from './api/almacen.controller';
import { AlmacenRepoProvider } from './repository/almacen-provider';
import { EliminarAlmacenCasoUso } from './almacen-caso-uso/eliminar';
@Module({
  imports: [TypeOrmModule.forFeature([AlmacenRepository])],
  providers: [
    CrearAlmacenCasoUso,
    EditarAlmacenCasoUso,
    LeerAlmacenCasoUso,
    AlmacenRepoProvider,
    EliminarAlmacenCasoUso,
  ],
  controllers: [AlmacenController],
  exports: [LeerAlmacenCasoUso],
})
export class AlmacenModule {}
