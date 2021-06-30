import { Inject, Injectable } from '@nestjs/common';
import { IMenuCasoUso } from './IMenuCasoUso';

const MenuRepo = () => Inject('MenuRepo');

@Injectable()
export class EliminarMenuCasoUso {
  constructor(@MenuRepo() private readonly _productoRepository: IMenuCasoUso) {}

  async eliminar(MenuID: number): Promise<boolean> {
    await this._productoRepository.obtenerPodId(MenuID);
    return await this._productoRepository.eliminar(MenuID);
  }
}
