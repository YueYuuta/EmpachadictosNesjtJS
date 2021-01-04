import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from './api/categoria.controller';
import { CrearCategoriaCasoUso } from './categoria-caso-uso/crear';
import { EliminarCategoriaCasoUso } from './categoria-caso-uso/eliminar';
import { CategoriaRepoProvider } from './repository/categoria-provider';
import { CategoriaRepository } from './repository/categoria.repository';
import { EditarCategoriaCasoUso } from './categoria-caso-uso/editar';
import { LeerCategoriaCasoUso } from './categoria-caso-uso/leer';
import { ImagenCategoriaController } from './api/imagen-categoria.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaRepository])],
  providers: [
    CrearCategoriaCasoUso,
    EditarCategoriaCasoUso,
    LeerCategoriaCasoUso,
    CategoriaRepoProvider,
    EliminarCategoriaCasoUso,
  ],
  controllers: [CategoriaController, ImagenCategoriaController],
  exports: [LeerCategoriaCasoUso, CategoriaRepoProvider],
})
export class CategoriaModule {}
