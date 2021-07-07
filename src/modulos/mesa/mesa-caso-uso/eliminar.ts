import { Inject, Injectable } from '@nestjs/common';
import { IMesaCasoUso } from './IMesaCasoUso';

const MesaRepo = () => Inject('MesaRepo');

@Injectable()
export class EliminarMesaCasoUso {
  constructor(@MesaRepo() private readonly _planRepository: IMesaCasoUso) {}

  async eliminar(MesaID: number): Promise<boolean> {
    await this._planRepository.obtenerPodId(MesaID);
    return await this._planRepository.eliminar(MesaID);
  }
}
