import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LeerUsuarioDto } from '../api/dto/leer-usuario.dto';
import { Usuario } from '@modulos/usuario/entidates/usuario.entity';
import { plainToClass } from 'class-transformer';
import { IAuthCasoUso } from './IAuthCasoUso';
import { LeerUsuarioAlmacenCasoUso } from '@modulos/usuario-almacen/usuario-almacen-caso-uso/leer';
import { LeerUAlmacenLoginDto } from './dto/ualmacen-login.dto';
import { UsuarioModel } from '@modulos/usuario/usuario-caso-uso/models/usuario';
import { Login } from './models/login';

const UserRepo = () => Inject('AuthRepo');

@Injectable()
export class TokenCasoUso {
  constructor(
    @UserRepo() private readonly _authService: IAuthCasoUso,
    private readonly _usuarioAlmacenService: LeerUsuarioAlmacenCasoUso,
  ) {}
  async refrescar(UsuarioID: number): Promise<Login> {
    const usuario: Usuario = await this._authService.obtenerPodId(UsuarioID);

    const existAlmacenAsig = await this._usuarioAlmacenService.obtenerPorUsuario(
      UsuarioID,
    );
    if (!existAlmacenAsig) {
      throw new UnauthorizedException(
        'El usuario aun no ha sido asignado a un almacen porfacor comuniquese con un administrador!',
      );
    }

    const token = await this._authService.crearToken(usuario);
    const usuarioAlmacen = existAlmacenAsig.map(usuarioAlmacen =>
      plainToClass(LeerUAlmacenLoginDto, usuarioAlmacen),
    );
    const usuarioModel = new UsuarioModel(usuario);
    const usuarioDto = plainToClass(LeerUsuarioDto, usuarioModel);
    return {
      Token: token,
      Usuario: usuarioDto,
      UsuarioAlmacen: usuarioAlmacen,
    };
  }
}
