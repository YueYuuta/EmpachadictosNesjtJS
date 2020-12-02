import { Usuario } from '@modulos/usuario/entidates/usuario.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../interface/jwt';
import { IAuthCasoUso } from '../login-caso-uso/IAuthCasoUso';
import { AuthRepository } from './auth.repository';
import { LeerUsuarioAlmacenDto } from '../../usuario-almacen/api/dto/leer-usuario-almacen.dto';

@Injectable()
export class AuthRepoService implements IAuthCasoUso {
  constructor(
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async obtenerPodId(UsuarioID: number): Promise<Usuario> {
    try {
      const usuario: Usuario = await this._authRepository.findOne(UsuarioID);
      if (!usuario) {
        throw new NotFoundException(
          `El usuario no existe en la base de datos!`,
        );
      }
      return usuario;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async existeUsuario(Usuario: string): Promise<Usuario> {
    try {
      return await this._authRepository.findOne({
        where: { Estado: true, Usuario },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crearToken(usuario: Usuario): Promise<string> {
    const payload: IJwtPayload = {
      UsuarioID: usuario.UsuarioID,
      Correo: usuario.Correo,
      Usuario: usuario.Usuario,
      Rol: usuario.Rol,
    };
    const token = this._jwtService.sign(payload);
    return token;
  }
}
