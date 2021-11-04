import { Inject, Injectable } from '@nestjs/common';
import { IProveedorCasoUso } from './IProveedorCasoUso';

const ProveedorRepo = () => Inject('ProveedorRepo');

@Injectable()
export class EliminarProveedorCasoUso {
  constructor(
    @ProveedorRepo() private readonly _proveedorRepository: IProveedorCasoUso,
  ) {}

  async eliminar(ProveedorID: number): Promise<boolean> {
    await this._proveedorRepository.obtenerPodId(ProveedorID);
    return await this._proveedorRepository.eliminar(ProveedorID);
  }
}
