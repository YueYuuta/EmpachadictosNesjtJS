import { Inject, Injectable } from '@nestjs/common';
import { IPublicidadCasoUso } from './IPublicidadCasoUso';

const PublicidadRepo = () => Inject('PublicidadRepo');

@Injectable()
export class EliminarPublicidadCasoUso {
  constructor(
    @PublicidadRepo()
    private readonly _publicidadRepository: IPublicidadCasoUso,
  ) {}

  async eliminar(PublicidadID: number): Promise<boolean> {
    await this._publicidadRepository.obtenerPodId(PublicidadID);
    return await this._publicidadRepository.eliminar(PublicidadID);
  }
}
