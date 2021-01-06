import { Inject, Injectable } from '@nestjs/common';
import { IProvinciaCasoUso } from './IProvinciaCasoUso';

const ProvinciaRepo = () => Inject('ProvinciaRepo');

@Injectable()
export class EliminarProvinciaCasoUso {
  constructor(
    @ProvinciaRepo() private readonly _provinciaRepository: IProvinciaCasoUso,
  ) {}

  async eliminar(ProvinciaID: number): Promise<boolean> {
    await this._provinciaRepository.obtenerPodId(ProvinciaID);
    return await this._provinciaRepository.eliminar(ProvinciaID);
  }
}
