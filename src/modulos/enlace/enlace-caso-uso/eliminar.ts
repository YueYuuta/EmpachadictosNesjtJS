import { Inject, Injectable } from '@nestjs/common';
import { IEnlaceCasoUso } from './IEnlaceCasoUso';

const EnlaceRepo = () => Inject('EnlaceRepo');

@Injectable()
export class EliminarEnlaceCasoUso {
  constructor(
    @EnlaceRepo() private readonly _enlaceRepository: IEnlaceCasoUso,
  ) {}

  async eliminar(EnlaceID: number): Promise<boolean> {
    await this._enlaceRepository.obtenerPodId(EnlaceID);
    return await this._enlaceRepository.eliminar(EnlaceID);
  }
}
