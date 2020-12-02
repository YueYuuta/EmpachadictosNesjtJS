import { Inject, Injectable } from '@nestjs/common';
import { IUsuarioAlmacenCasoUso } from './IUsuarioAlmacenCasoUso';

const UsuarioAlmacenRepo = () => Inject('UsuarioAlmacenRepo');

@Injectable()
export class EliminarUsuarioAlmacenCasoUso {
  constructor(
    @UsuarioAlmacenRepo()
    private readonly _usuarioAlmacenRepository: IUsuarioAlmacenCasoUso,
  ) {}

  async eliminar(UsuarioAlmacenID: number): Promise<boolean> {
    await this._usuarioAlmacenRepository.obtenerPodId(UsuarioAlmacenID);
    return await this._usuarioAlmacenRepository.eliminar(UsuarioAlmacenID);
  }
}
