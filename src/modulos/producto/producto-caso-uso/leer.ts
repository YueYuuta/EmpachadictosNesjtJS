import { Inject, Injectable } from '@nestjs/common';
import { ImageDefault, PathFile } from '@utils/enums';
import { plainToClass } from 'class-transformer';
import { LeerProductoDto } from '../api/dto';
import { IProductoCasoUso } from './IProductoCasoUso';

const ProductoRepo = () => Inject('ProductoRepo');

@Injectable()
export class LeerProductoCasoUso {
  constructor(
    @ProductoRepo() private readonly _productoRepository: IProductoCasoUso,
  ) {}

  async obtenerProId(ProductoID: number): Promise<LeerProductoDto> {
    const producto = await this._productoRepository.obtenerPodId(ProductoID);
    return plainToClass(LeerProductoDto, producto);
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerProductoDto[]> {
    let productos: any;
    if (termino) {
      termino = termino.trim();
      productos = await this._productoRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      productos = await this._productoRepository.obtenerPaginado(desde, limite);
    }
    return productos.map((producto: any) =>
      plainToClass(LeerProductoDto, producto),
    );
  }

  async obtenerPaginadoPorCategoria(
    desde: number,
    limite: number,
    CategoriaID: number,
    termino?: string,
  ): Promise<LeerProductoDto[]> {
    let productos: any;
    if (termino) {
      termino = termino.trim();
      productos = await this._productoRepository.obtenerPorBusquedaYCategoria(
        desde,
        limite,
        termino,
        CategoriaID,
      );
    } else {
      productos = await this._productoRepository.obtenerPaginadoPorCategoria(
        desde,
        limite,
        CategoriaID,
      );
    }
    return productos.map((producto: any) =>
      plainToClass(LeerProductoDto, producto),
    );
  }

  async obtenerImagen(nombreImagen: string): Promise<string> {
    if (nombreImagen === ImageDefault.PRODUCT) {
      return PathFile.DEFAULT;
    } else {
      return PathFile.PRODUCTS;
    }
  }
}
