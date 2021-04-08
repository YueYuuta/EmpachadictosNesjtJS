import { Inject, Injectable } from '@nestjs/common';
import { ITerminoCasoUso } from './ITerminoCasoUso';

const TerminoRepo = () => Inject('TerminoRepo');

@Injectable()
export class EliminarTerminoCasoUso {
  constructor(
    @TerminoRepo() private readonly _terminoRepository: ITerminoCasoUso,
  ) {}

  async eliminar(TerminoID: number): Promise<boolean> {
    await this._terminoRepository.obtenerPodId(TerminoID);
    return await this._terminoRepository.eliminar(TerminoID);
  }
}
