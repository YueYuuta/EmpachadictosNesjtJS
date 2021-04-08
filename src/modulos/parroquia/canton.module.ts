import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParroquiaController } from './api/parroquia.controller';
import { CrearParroquiaCasoUso } from './parroquia-caso-uso/crear';
import { EliminarParroquiaCasoUso } from './parroquia-caso-uso/eliminar';
import { ParroquiaRepoProvider } from './repository/parroquia-provider';
import { ParroquiaRepository } from './repository/parroquia.repository';
import { EditarParroquiaCasoUso } from './parroquia-caso-uso/editar';
import { LeerParroquiaCasoUso } from './parroquia-caso-uso/leer';
import { CantonModule } from '@modulos/canton/canton.module';

@Module({
  imports: [TypeOrmModule.forFeature([ParroquiaRepository]), CantonModule],
  providers: [
    CrearParroquiaCasoUso,
    EditarParroquiaCasoUso,
    LeerParroquiaCasoUso,
    ParroquiaRepoProvider,
    EliminarParroquiaCasoUso,
  ],
  controllers: [ParroquiaController],
  exports: [LeerParroquiaCasoUso, ParroquiaRepoProvider],
})
export class ParroquiaModule {}
