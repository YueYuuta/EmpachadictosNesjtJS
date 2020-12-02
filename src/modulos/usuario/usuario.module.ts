import { Module } from '@nestjs/common';
import { CrearUsuarioCasoUso } from './usuario-caso-uso/crear';
import { UsuarioController } from './api/usuario.controller';
import { UserRepoProvider } from './repository/user-provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from './repository/usuario.repository';
import { EditarUsuarioCasoUso } from './usuario-caso-uso/editar';
import { ResetearContraseñaCasoUso } from './usuario-caso-uso/resetear-contraseña';
import { LeerUsuarioCasoUso } from './usuario-caso-uso/leer';
import { UsuarioDetalleRepository } from './repository/usuario-detalle.repository';
import { EliminarUsuarioCasoUso } from './usuario-caso-uso/eliminar';
import { ImagenUsuarioController } from './api/imagen-usuario.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository, UsuarioDetalleRepository]),
  ],
  providers: [
    CrearUsuarioCasoUso,
    UserRepoProvider,
    EditarUsuarioCasoUso,
    ResetearContraseñaCasoUso,
    LeerUsuarioCasoUso,
    EliminarUsuarioCasoUso,
  ],
  controllers: [UsuarioController, ImagenUsuarioController],
  exports: [LeerUsuarioCasoUso],
})
export class UsuarioModule {}
