import { Inject, Injectable } from '@nestjs/common';
import { ImageDefault, PathFile } from '@utils/enums';
import { plainToClass } from 'class-transformer';
import { LeerCategoriaDto } from '../api/dto';
import { ICategoriaCasoUso } from './ICategoriaCasoUso';

const CategoriaRepo = () => Inject('CategoriaRepo');

@Injectable()
export class LeerCategoriaCasoUso {
  constructor(
    @CategoriaRepo() private readonly _categoriaRepository: ICategoriaCasoUso,
  ) {}

  async obtenerProId(CategoriaID: number): Promise<LeerCategoriaDto> {
    const categoria = await this._categoriaRepository.obtenerPodId(CategoriaID);
    return plainToClass(LeerCategoriaDto, categoria);
  }

  async obtener(): Promise<LeerCategoriaDto[]> {
    const categorias: LeerCategoriaDto[] = await this._categoriaRepository.obtener();
    return categorias.map((categoria: LeerCategoriaDto) =>
      plainToClass(LeerCategoriaDto, categoria),
    );
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerCategoriaDto[]> {
    let categorias: any;
    if (termino) {
      termino = termino.trim();
      categorias = await this._categoriaRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      categorias = await this._categoriaRepository.obtenerPaginado(
        desde,
        limite,
      );
    }
    return categorias.map((categoria: any) =>
      plainToClass(LeerCategoriaDto, categoria),
    );
  }
  async obtenerImagen(nameImg: string): Promise<any> {
    if (nameImg === ImageDefault.CATEGORIA) {
      return PathFile.DEFAULT;
    } else {
      return PathFile.CATEGORIA;
    }
  }
}
