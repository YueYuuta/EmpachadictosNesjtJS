import { Inject, Injectable } from '@nestjs/common';
import { IParroquiaCasoUso } from './IParroquiaCasoUso';

const ParroquiaRepo = () => Inject('ParroquiaRepo');

@Injectable()
export class EliminarParroquiaCasoUso {
  constructor(
    @ParroquiaRepo() private readonly _parroquiaRepository: IParroquiaCasoUso,
  ) {}

  async eliminar(ParroquiaID: number): Promise<boolean> {
    await this._parroquiaRepository.obtenerPodId(ParroquiaID);
    return await this._parroquiaRepository.eliminar(ParroquiaID);
  }
}
