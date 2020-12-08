import { Inject, Injectable } from '@nestjs/common';
import { IRolCasoUso } from './IRolCasoUso';

const RolRepo = () => Inject('RolRepo');

@Injectable()
export class EliminarRolCasoUso {
  constructor(@RolRepo() private readonly _rolRepository: IRolCasoUso) {}

  async eliminar(RoleID: number): Promise<boolean> {
    await this._rolRepository.obtenerPodId(RoleID);
    return await this._rolRepository.eliminar(RoleID);
  }
}
