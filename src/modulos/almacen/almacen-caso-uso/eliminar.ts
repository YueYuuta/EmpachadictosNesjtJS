import { Inject, Injectable } from '@nestjs/common';
import { IAlmacenCasoUso } from './IAlmacenCasoUso';

const AlmacenRepo = () => Inject('AlmacenRepo');

@Injectable()
export class EliminarAlmacenCasoUso {
  constructor(
    @AlmacenRepo() private readonly _AlmacenRepository: IAlmacenCasoUso,
  ) {}

  async eliminar(AlmacenID: number): Promise<boolean> {
    await this._AlmacenRepository.obtenerPodId(AlmacenID);
    return await this._AlmacenRepository.eliminar(AlmacenID);
  }
}
