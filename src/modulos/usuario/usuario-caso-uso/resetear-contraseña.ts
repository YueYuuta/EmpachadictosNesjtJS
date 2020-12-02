import { Inject, Injectable } from '@nestjs/common';
import { IUsuarioCasoUso } from './IUsuarioCasoUso';
import { LeerUsuarioDto } from '../api/dto/leer-usuario.dto';
import { Usuario } from '../entidates/usuario.entity';
import { plainToClass } from 'class-transformer';
import { UsuarioModel } from './models/usuario';
import { ProveedorBcrypt } from '../proveedores/brcypt';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class ResetearContraseñaCasoUso {
  constructor(@UserRepo() private readonly _userRepository: IUsuarioCasoUso) {}
  async resetear(
    usuario: Partial<UsuarioModel>,
    UsuarioID: number,
  ): Promise<LeerUsuarioDto> {
    const { Contraseña } = usuario;
    usuario.Contraseña = await ProveedorBcrypt.encriptarContra(Contraseña);
    const usuarioGuardado: Usuario = await this._userRepository.editar(
      usuario,
      UsuarioID,
    );
    return plainToClass(LeerUsuarioDto, usuarioGuardado);
  }
}
