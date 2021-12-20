import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerProductoAlmacenDto } from '../api/dto';
import { IProductoAlmacenCasoUso } from './IProductoAlmacenCasoUso';

const ProductoAlmacenRepo = () => Inject('ProductoAlmacenRepo');

@Injectable()
export class LeerProductoAlmacenCasoUso {
  constructor(
    @ProductoAlmacenRepo()
    private readonly _productoAlmacenRepository: IProductoAlmacenCasoUso,
  ) {}

  async obtenerProId(
    ProductoAlmacenID: number,
  ): Promise<LeerProductoAlmacenDto> {
    const productoAlmacen = await this._productoAlmacenRepository.obtenerPorId(
      ProductoAlmacenID,
    );
    return plainToClass(LeerProductoAlmacenDto, productoAlmacen);
  }
  async ExisteProductoEnELAlmacen(
    AlmacenID: number,
    ProductoID: number,
  ): Promise<LeerProductoAlmacenDto> {
    const productoAlmacen = await this._productoAlmacenRepository.ExisteProductoEnELAlmacen(
      AlmacenID,
      ProductoID,
    );
    return plainToClass(LeerProductoAlmacenDto, productoAlmacen);
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    AlmacenID: number,
    termino?: string,
  ): Promise<LeerProductoAlmacenDto[]> {
    let productoAlmacens: any;
    if (termino) {
      termino = termino.trim();
      productoAlmacens = await this._productoAlmacenRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
        AlmacenID,
      );
    } else {
      productoAlmacens = await this._productoAlmacenRepository.obtenerPaginado(
        desde,
        limite,
        AlmacenID,
      );
    }
    return productoAlmacens.map((productoAlmacen: any) =>
      plainToClass(LeerProductoAlmacenDto, productoAlmacen),
    );
  }

  async obtenerPaginadoPorCategoria(
    desde: number,
    limite: number,
    CategoriaID: number,
    AlmacenID: number,
    termino?: string,
  ): Promise<LeerProductoAlmacenDto[]> {
    let productoAlmacens: any;
    if (termino) {
      termino = termino.trim();
      productoAlmacens = await this._productoAlmacenRepository.obtenerPorBusquedaYCategoria(
        desde,
        limite,
        termino,
        CategoriaID,
        AlmacenID,
      );
    } else {
      productoAlmacens = await this._productoAlmacenRepository.obtenerPaginadoPorCategoria(
        desde,
        limite,
        CategoriaID,
        AlmacenID,
      );
    }
    return productoAlmacens.map((productoAlmacen: any) =>
      plainToClass(LeerProductoAlmacenDto, productoAlmacen),
    );
  }

  async obtenerProductoPorNombre(
    Descripcion: string,
    AlmacenID: number,
  ): Promise<LeerProductoAlmacenDto[]> {
    const productosAlmacen = await this._productoAlmacenRepository.obtenerProductoPorNombre(
      Descripcion,
      AlmacenID,
    );
    return productosAlmacen.map((productoAlmacen: any) =>
      plainToClass(LeerProductoAlmacenDto, productoAlmacen),
    );
  }
  async obtenerProductoPorCodigoDeBarra(
    CodigoBarra: string,
    AlmacenID: number,
  ): Promise<LeerProductoAlmacenDto> {
    const productoAlmacen = await this._productoAlmacenRepository.obtenerProductoPorCodigoDeBarra(
      CodigoBarra,
      AlmacenID,
    );

    return plainToClass(LeerProductoAlmacenDto, productoAlmacen);
  }
}
