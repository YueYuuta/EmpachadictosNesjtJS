import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerProductoAlmacenDto } from '../api/dto';
import { IProductoAlmacenCasoUso } from './IProductoAlmacenCasoUso';

const ProductoAlmacenRepo = () => Inject('ProductoAlmacenRepo');

@Injectable()
export class LeerProductoAlmacenCasoUso {
  constructor(
    @ProductoAlmacenRepo()
    private readonly _menuRepository: IProductoAlmacenCasoUso,
  ) {}

  async obtenerProId(
    ProductoAlmacenID: number,
  ): Promise<LeerProductoAlmacenDto> {
    const menu = await this._menuRepository.obtenerPorId(ProductoAlmacenID);
    return plainToClass(LeerProductoAlmacenDto, menu);
  }
  async ExisteProductoEnELAlmacen(
    AlmacenID: number,
    ProductoID: number,
  ): Promise<LeerProductoAlmacenDto> {
    const menu = await this._menuRepository.ExisteProductoEnELAlmacen(
      AlmacenID,
      ProductoID,
    );
    return plainToClass(LeerProductoAlmacenDto, menu);
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    AlmacenID: number,
    termino?: string,
  ): Promise<LeerProductoAlmacenDto[]> {
    let menus: any;
    if (termino) {
      termino = termino.trim();
      menus = await this._menuRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
        AlmacenID,
      );
    } else {
      menus = await this._menuRepository.obtenerPaginado(
        desde,
        limite,
        AlmacenID,
      );
    }
    return menus.map((menu: any) => plainToClass(LeerProductoAlmacenDto, menu));
  }

  async obtenerPaginadoPorCategoria(
    desde: number,
    limite: number,
    CategoriaID: number,
    AlmacenID: number,
    termino?: string,
  ): Promise<LeerProductoAlmacenDto[]> {
    let menus: any;
    if (termino) {
      termino = termino.trim();
      menus = await this._menuRepository.obtenerPorBusquedaYCategoria(
        desde,
        limite,
        termino,
        CategoriaID,
        AlmacenID,
      );
    } else {
      menus = await this._menuRepository.obtenerPaginadoPorCategoria(
        desde,
        limite,
        CategoriaID,
        AlmacenID,
      );
    }
    return menus.map((menu: any) => plainToClass(LeerProductoAlmacenDto, menu));
  }
}
