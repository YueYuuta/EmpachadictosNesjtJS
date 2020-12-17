import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ICategoriaCasoUso } from './ICategoriaCasoUso';
import { CategoriaModel } from './models/categoria';

const CategoriaRepo = () => Inject('CategoriaRepo');

@Injectable()
export class EditarCategoriaCasoUso {
  constructor(
    @CategoriaRepo() private readonly _categoriaRepository: ICategoriaCasoUso,
  ) {}

  async editar(
    categoria: CategoriaModel,
    CategoriaID: number,
  ): Promise<boolean> {
    categoria.Nombre = categoria.Nombre.toUpperCase();
    const nombreCategoria = await this._categoriaRepository.verificarNombreEditar(
      categoria.Nombre,
      CategoriaID,
    );
    if (nombreCategoria) {
      throw new ConflictException(
        `La categoria: ${categoria.Nombre}, ya existe!`,
      );
    }
    await this._categoriaRepository.obtenerPodId(CategoriaID);
    const categoriaEditado: boolean = await this._categoriaRepository.editar(
      categoria,
      CategoriaID,
    );
    return categoriaEditado;
  }
}
