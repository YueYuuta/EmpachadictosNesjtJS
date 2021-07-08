import { Inject, Injectable } from '@nestjs/common';
import { IMenuAlmacenCasoUso } from './IMenuAlmacenCasoUso';

const MenuAlmacenRepo = () => Inject('MenuAlmacenRepo');

@Injectable()
export class EliminarMenuAlmacenCasoUso {
  constructor(
    @MenuAlmacenRepo()
    private readonly _MenuAlmacenRepository: IMenuAlmacenCasoUso,
  ) {}

  async eliminar(MenuAlmacenID: number): Promise<boolean> {
    await this._MenuAlmacenRepository.obtenerPodId(MenuAlmacenID);
    return await this._MenuAlmacenRepository.eliminar(MenuAlmacenID);
  }
}
