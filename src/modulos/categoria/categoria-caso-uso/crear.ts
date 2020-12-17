import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { CategoriaModel } from './models/categoria';
import { LeerCategoriaDto } from '../api/dto';
import { ICategoriaCasoUso } from './ICategoriaCasoUso';
import { Categoria } from '../entidades/categoria.entity';

const CategoriaRepo = () => Inject('CategoriaRepo');

@Injectable()
export class CrearCategoriaCasoUso {
  constructor(
    @CategoriaRepo() private readonly _categoriaRepository: ICategoriaCasoUso,
  ) {}

  async crear(categoria: CategoriaModel): Promise<LeerCategoriaDto> {
    categoria.Nombre = categoria.Nombre.toUpperCase();
    const nombreCategoria = await this._categoriaRepository.verificarNombre(
      categoria.Nombre,
    );
    if (nombreCategoria) {
      throw new ConflictException(
        `La categoria: ${categoria.Nombre}, ya existe!`,
      );
    }
    const categoriaGuardado: Categoria = await this._categoriaRepository.crear(
      categoria,
    );
    return plainToClass(LeerCategoriaDto, categoriaGuardado);
  }
}
