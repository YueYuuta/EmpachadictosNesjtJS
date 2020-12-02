import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUsuarioCasoUso } from './IUsuarioCasoUso';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class EliminarUsuarioCasoUso {
  constructor(@UserRepo() private readonly _userRepository: IUsuarioCasoUso) {}

  async eliminar(UsuarioID: number, UsuarioLoginID: number): Promise<boolean> {
    const usuario = await this._userRepository.autoEliminar(
      UsuarioID,
      UsuarioLoginID,
    );
    if (!usuario) {
      throw new NotFoundException(
        `Error al eliminar el usuario no existe o esta tratando de autoeliminarse :D`,
      );
    }
    return await this._userRepository.eliminar(UsuarioID);
  }
}
