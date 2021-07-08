import { Almacen } from '@modulos/almacen/entidates/almacen.entity';
import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerMenuAlmacenDto } from '../api/dto';
import { IMenuAlmacenCasoUso } from './IMenuAlmacenCasoUso';

const MenuAlmacenRepo = () => Inject('MenuAlmacenRepo');

@Injectable()
export class LeerMenuAlmacenCasoUso {
  constructor(
    @MenuAlmacenRepo() private readonly _menuRepository: IMenuAlmacenCasoUso,
  ) {}

  async obtenerProId(MenuAlmacenID: number): Promise<LeerMenuAlmacenDto> {
    const menu = await this._menuRepository.obtenerPodId(MenuAlmacenID);
    return plainToClass(LeerMenuAlmacenDto, menu);
  }
  async ExisteMenuEnELAlmacen(
    AlmacenID: number,
    MenuID: number,
  ): Promise<LeerMenuAlmacenDto> {
    const menu = await this._menuRepository.ExisteMenuEnELAlmacen(
      AlmacenID,
      MenuID,
    );
    return plainToClass(LeerMenuAlmacenDto, menu);
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    AlmacenID: number,
    termino?: string,
  ): Promise<LeerMenuAlmacenDto[]> {
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
    return menus.map((menu: any) => plainToClass(LeerMenuAlmacenDto, menu));
  }

  async obtenerPaginadoPorCategoria(
    desde: number,
    limite: number,
    CategoriaID: number,
    AlmacenID: number,
    termino?: string,
  ): Promise<LeerMenuAlmacenDto[]> {
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
    return menus.map((menu: any) => plainToClass(LeerMenuAlmacenDto, menu));
  }
}
