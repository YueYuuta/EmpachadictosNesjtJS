import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './api/cliente.controller';
import { CrearClienteCasoUso } from './cliente-caso-uso/crear';
import { EditarClienteCasoUso } from './cliente-caso-uso/editar';
import { EliminarClienteCasoUso } from './cliente-caso-uso/eliminar';
import { LeerClienteCasoUso } from './cliente-caso-uso/leer';
import { ClienteRepoProvider } from './repository/cliente-provider';
import { ClienteRepository } from './repository/cliente.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteRepository])],
  providers: [
    CrearClienteCasoUso,
    EditarClienteCasoUso,
    LeerClienteCasoUso,
    ClienteRepoProvider,
    EliminarClienteCasoUso,
  ],
  controllers: [ClienteController],
  exports: [LeerClienteCasoUso],
})
export class ClienteModule {}
