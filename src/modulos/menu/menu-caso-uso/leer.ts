import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerMenuDto } from '../api/dto';
import { IMenuCasoUso } from './IMenuCasoUso';

const MenuRepo = () => Inject('MenuRepo');

@Injectable()
export class LeerMenuCasoUso {
  constructor(@MenuRepo() private readonly _menuRepository: IMenuCasoUso) {}

  async obtenerProId(MenuID: number): Promise<LeerMenuDto> {
    const menu = await this._menuRepository.obtenerPodId(MenuID);
    return plainToClass(LeerMenuDto, menu);
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerMenuDto[]> {
    let menus: any;
    if (termino) {
      termino = termino.trim();
      menus = await this._menuRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      menus = await this._menuRepository.obtenerPaginado(desde, limite);
    }
    return menus.map((menu: any) => plainToClass(LeerMenuDto, menu));
  }

  async obtenerPaginadoPorCategoria(
    desde: number,
    limite: number,
    CategoriaID: number,
    termino?: string,
  ): Promise<LeerMenuDto[]> {
    let menus: any;
    if (termino) {
      termino = termino.trim();
      menus = await this._menuRepository.obtenerPorBusquedaYCategoria(
        desde,
        limite,
        termino,
        CategoriaID,
      );
    } else {
      menus = await this._menuRepository.obtenerPaginadoPorCategoria(
        desde,
        limite,
        CategoriaID,
      );
    }
    return menus.map((menu: any) => plainToClass(LeerMenuDto, menu));
  }
}
