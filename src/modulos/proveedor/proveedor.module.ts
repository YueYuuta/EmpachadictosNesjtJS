import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorController } from './api/proveedor.controller';
import { CrearProveedorCasoUso } from './proveedor-caso-uso/crear';
import { EditarProveedorCasoUso } from './proveedor-caso-uso/editar';
import { EliminarProveedorCasoUso } from './proveedor-caso-uso/eliminar';
import { LeerProveedorCasoUso } from './proveedor-caso-uso/leer';
import { ProveedorRepoProvider } from './repository/proveedor-provider';
import { ProveedorRepository } from './repository/proveedor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProveedorRepository])],
  providers: [
    CrearProveedorCasoUso,
    EditarProveedorCasoUso,
    LeerProveedorCasoUso,
    ProveedorRepoProvider,
    EliminarProveedorCasoUso,
  ],
  controllers: [ProveedorController],
  exports: [LeerProveedorCasoUso],
})
export class ProveedorModule {}
