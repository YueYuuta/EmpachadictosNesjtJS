import { Inject, Injectable } from '@nestjs/common';
import { IClienteCasoUso } from './IClienteCasoUso';

const ClienteRepo = () => Inject('ClienteRepo');

@Injectable()
export class EliminarClienteCasoUso {
  constructor(
    @ClienteRepo() private readonly _clienteRepository: IClienteCasoUso,
  ) {}

  async eliminar(ClienteID: number): Promise<boolean> {
    await this._clienteRepository.obtenerPodId(ClienteID);
    return await this._clienteRepository.eliminar(ClienteID);
  }
}
