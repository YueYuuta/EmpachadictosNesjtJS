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
import { UsuarioModel } from './models/usuario';
import {
  deleteDirectory,
  manejoDeImagenes,
} from '@utils/manejo-imagenes/imagen-express-fileup';
import { PathFile } from '@utils/enums/path-file.enum';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class EditarUsuarioCasoUso {
  constructor(@UserRepo() private readonly _userRepository: IUsuarioCasoUso) {}

  async editar(
    usuario: Partial<UsuarioModel>,
    UsuarioID: number,
    req: any,
  ): Promise<LeerUsuarioDto> {
    let nombreImagen: string;
    const { Correo, Usuario } = usuario;

    await this._userRepository.obtenerPodId(UsuarioID);
    const existeUsuarioCorreo = await this._userRepository.existeUsuarioCorreoEditar(
      Correo,
      UsuarioID,
    );
    if (existeUsuarioCorreo) {
      throw new ConflictException(
        `El usuario con correo: ${Correo} ya esta en uso!`,
      );
    }
    const existeUsuario = await this._userRepository.existeUsuarioEditar(
      Usuario,
      UsuarioID,
    );
    if (existeUsuario) {
      throw new ConflictException(
        `El usuario con nombre de usuario: ${Usuario} ya esta en uso!`,
      );
    }

    if (req.files) {
      nombreImagen = await manejoDeImagenes(req, PathFile.USERS);
    }
    try {
      const usuarioGuardado: Usuario = await this._userRepository.editar(
        usuario,
        UsuarioID,
      );
      const dto = new UsuarioModel(usuarioGuardado);
      return plainToClass(LeerUsuarioDto, dto);
    } catch (error) {
      console.log(error);
      await deleteDirectory(`${PathFile.USERS}/${nombreImagen}`);
      throw new InternalServerErrorException(
        'El usuario no pudo ser guardado, porfavor comuniquese con el soporte del sistema!',
      );
    }
  }
}
