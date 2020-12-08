import { Module } from '@nestjs/common';
import { RolController } from './api/rol.controller';
import { CrearRoleCasoUso } from './role-caso-uso/crear';
import { RolRepoProvider } from './repository/rol-provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolRepository } from './repository/role.repository';
import { RolPermisoRepository } from './repository/rol-permiso.repository';
import { PermisoRepository } from './repository/permiso.repository';
import { EditarRoleCasoUso } from './role-caso-uso/editar';
import { EliminarRolCasoUso } from './role-caso-uso/eliminar';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RolRepository,
      RolPermisoRepository,
      PermisoRepository,
    ]),
  ],
  controllers: [RolController],
  providers: [
    CrearRoleCasoUso,
    RolRepoProvider,
    EditarRoleCasoUso,
    EliminarRolCasoUso,
  ],
})
export class RolModule {}
