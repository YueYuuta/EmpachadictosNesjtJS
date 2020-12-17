import { Inject, Injectable } from '@nestjs/common';
import { ICategoriaCasoUso } from './ICategoriaCasoUso';

const CategoriaRepo = () => Inject('CategoriaRepo');

@Injectable()
export class EliminarCategoriaCasoUso {
  constructor(
    @CategoriaRepo() private readonly _categoriaRepository: ICategoriaCasoUso,
  ) {}

  async eliminar(CategoriaID: number): Promise<boolean> {
    await this._categoriaRepository.obtenerPodId(CategoriaID);
    return await this._categoriaRepository.eliminar(CategoriaID);
  }
}
