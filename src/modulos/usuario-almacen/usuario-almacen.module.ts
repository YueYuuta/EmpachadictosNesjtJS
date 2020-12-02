import { Module } from '@nestjs/common';
import { AlmacenModule } from '@modulos/almacen/almacen.module';
import { UsuarioModule } from '@modulos/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioAlmacenRepository } from './repository/almacen.repository';
import { CrearUsuarioAlmacenCasoUso } from './usuario-almacen-caso-uso/crear';
import { LeerUsuarioAlmacenCasoUso } from './usuario-almacen-caso-uso/leer';
import { EditarUsuarioAlmacenCasoUso } from './usuario-almacen-caso-uso/editar';
import { EliminarUsuarioAlmacenCasoUso } from './usuario-almacen-caso-uso/eliminar';
import { UsuarioAlmacenController } from './api/usuario-almacen.controller';
import { UsuarioAlmacenRepoProvider } from './repository/almacen-provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioAlmacenRepository]),
    UsuarioModule,
    AlmacenModule,
  ],
  providers: [
    CrearUsuarioAlmacenCasoUso,
    LeerUsuarioAlmacenCasoUso,
    EditarUsuarioAlmacenCasoUso,
    EliminarUsuarioAlmacenCasoUso,
    UsuarioAlmacenRepoProvider,
  ],
  controllers: [UsuarioAlmacenController],
  exports: [LeerUsuarioAlmacenCasoUso],
})
export class UsuarioAlmacenModule {}
