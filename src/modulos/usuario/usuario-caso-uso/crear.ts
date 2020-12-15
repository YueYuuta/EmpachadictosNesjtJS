import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IUsuarioCasoUso } from './IUsuarioCasoUso';
import { LeerUsuarioDto } from '../api/dto/leer-usuario.dto';
import { Usuario } from '../entidates/usuario.entity';
import { plainToClass } from 'class-transformer';
import { ProveedorBcrypt } from '../proveedores/brcypt';
import { UsuarioModel } from './models/usuario';
import {
  deleteDirectory,
  manejoDeImagenes,
} from '@utils/manejo-imagenes/imagen-express-fileup';
import { PathFile } from '@utils/enums/path-file.enum';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class CrearUsuarioCasoUso {
  constructor(@UserRepo() private readonly _userRepository: IUsuarioCasoUso) {}

  async crear(usuario: UsuarioModel, req: any): Promise<LeerUsuarioDto> {
    console.log(usuario);
    let nombreImagen: string;
    const { Contraseña, Correo, Usuario } = usuario;
    const existeUsuarioCorreo = await this._userRepository.existeUsuarioCorreo(
      Correo,
    );
    if (existeUsuarioCorreo) {
      throw new ConflictException(
        `El usuario con correo: ${Correo} ya esta en uso!`,
      );
    }
    const existeUsuario = await this._userRepository.existeUsuario(Usuario);
    if (existeUsuario) {
      throw new ConflictException(
        `El usuario con nombre de usuario: ${Usuario} ya esta en uso!`,
      );
    }
    usuario.Contraseña = await ProveedorBcrypt.encriptarContra(Contraseña);
    if (req.files) {
      nombreImagen = await manejoDeImagenes(req, PathFile.USERS);
      usuario.Detalle.Avatar = nombreImagen;
    }
    try {
      const usuarioGuardado: Usuario = await this._userRepository.crear(
        usuario,
      );
      return plainToClass(LeerUsuarioDto, usuarioGuardado);
    } catch (error) {
      console.log(error);
      await deleteDirectory(`${PathFile.USERS}/${nombreImagen}`);
      throw new InternalServerErrorException(
        'El usuario no pudo ser guardado, porfavor comuniquese con el soporte del sistema!',
      );
    }
  }
}
