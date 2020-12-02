import { Inject, Injectable } from '@nestjs/common';
import { IUsuarioCasoUso } from './IUsuarioCasoUso';
import { LeerUsuarioDto } from '../api/dto/leer-usuario.dto';
import { Usuario } from '../entidates/usuario.entity';
import { plainToClass } from 'class-transformer';
import { ImageDefault, PathFile } from '@utils/enums';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class LeerUsuarioCasoUso {
  constructor(@UserRepo() private readonly _userRepository: IUsuarioCasoUso) {}

  async obtenerProId(UsuarioID: number): Promise<LeerUsuarioDto> {
    const usuario = await this._userRepository.obtenerPodId(UsuarioID);

    return plainToClass(LeerUsuarioDto, usuario);
  }

  async obtener(): Promise<LeerUsuarioDto[]> {
    const usuarios: Usuario[] = await this._userRepository.obtener();
    return usuarios.map((usuario: Usuario) =>
      plainToClass(LeerUsuarioDto, usuario),
    );
  }
  // async obtenerProBusqueda(termino: string): Promise<LeerUsuarioDto[]> {
  //   const usuarios = await this._userRepository.obtenerPorBusqueda(termino);
  //   return usuarios.map(usuario => plainToClass(LeerUsuarioDto, usuario));
  // }
  async obtenerPaginado(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<LeerUsuarioDto[]> {
    let usuarios: any;
    if (termino) {
      termino = termino.trim();
      usuarios = await this._userRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      usuarios = await this._userRepository.obtenerPaginado(desde, limite);
    }
    return usuarios.map(usuario => plainToClass(LeerUsuarioDto, usuario));
  }

  async validacionUsuario(nombreUsuario: string): Promise<boolean> {
    let respuesta: boolean = false;
    const usuario: Usuario = await this._userRepository.existeUsuario(
      nombreUsuario,
    );
    if (usuario) {
      respuesta = true;
    }
    return respuesta;
  }

  async validacionUsuarioEditar(
    nombreUsuario: string,
    UsuarioID: number,
  ): Promise<boolean> {
    let respuesta: boolean = false;
    const usuario: Usuario = await this._userRepository.existeUsuarioEditar(
      nombreUsuario,
      UsuarioID,
    );
    if (usuario) {
      respuesta = true;
    }
    return respuesta;
  }

  async getAvatar(nameImg: string): Promise<any> {
    if (nameImg === ImageDefault.USER) {
      return PathFile.DEFAULT;
    } else {
      return PathFile.USERS;
    }
  }
}
