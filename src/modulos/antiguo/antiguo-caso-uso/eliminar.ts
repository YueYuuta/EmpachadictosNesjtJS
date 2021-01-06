import { Inject, Injectable } from '@nestjs/common';
import { IAntiguoCasoUso } from './IAntiguoCasoUso';

const AntiguoRepo = () => Inject('AntiguoRepo');

@Injectable()
export class EliminarAntiguoCasoUso {
  constructor(
    @AntiguoRepo()
    private readonly _antiguoRepository: IAntiguoCasoUso,
  ) {}

  async eliminar(AntiguoID: number): Promise<boolean> {
    await this._antiguoRepository.obtenerPodId(AntiguoID);
    return await this._antiguoRepository.eliminar(AntiguoID);
  }
}
