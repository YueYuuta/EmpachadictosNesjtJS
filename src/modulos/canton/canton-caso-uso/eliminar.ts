import { Inject, Injectable } from '@nestjs/common';
import { ICantonCasoUso } from './ICantonCasoUso';

const CantonRepo = () => Inject('CantonRepo');

@Injectable()
export class EliminarCantonCasoUso {
  constructor(
    @CantonRepo() private readonly _cantonRepository: ICantonCasoUso,
  ) {}

  async eliminar(CantonID: number): Promise<boolean> {
    await this._cantonRepository.obtenerPodId(CantonID);
    return await this._cantonRepository.eliminar(CantonID);
  }
}
