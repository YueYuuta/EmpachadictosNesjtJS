import { LeerAlmacenCasoUso } from '@modulos/almacen/almacen-caso-uso/leer';
import { LeerUsuarioCasoUso } from '@modulos/usuario/usuario-caso-uso/leer';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EditarUsuarioAlmacenDto } from '../api/dto/editar-usuario-almacen.dto';
import { LeerUsuarioAlmacenDto } from '../api/dto/leer-usuario-almacen.dto';
import { UsuarioAlmacen } from '../entidates/usuario-almacen.entity';
import { IUsuarioAlmacenCasoUso } from './IUsuarioAlmacenCasoUso';

const UsuarioAlmacenRepo = () => Inject('UsuarioAlmacenRepo');

@Injectable()
export class EditarUsuarioAlmacenCasoUso {
  constructor(
    @UsuarioAlmacenRepo()
    private readonly _usuarioAlmacenRepository: IUsuarioAlmacenCasoUso,
    private readonly _usuarioService: LeerUsuarioCasoUso,
    private readonly _almacenService: LeerAlmacenCasoUso,
  ) {}

  async editar(
    usuarioAlmacen: Partial<EditarUsuarioAlmacenDto>,
    UsuarioAlmacenID: number,
  ): Promise<LeerUsuarioAlmacenDto> {
    const { Almacen, Usuario } = usuarioAlmacen;

    await this._usuarioService.obtenerProId(Usuario);
    await this._almacenService.obtenerProId(Almacen);

    const existe = await this._usuarioAlmacenRepository.validarExisteEditar(
      UsuarioAlmacenID,
      Usuario,
      Almacen,
    );
    if (existe) {
      throw new ConflictException(
        `El usuario ya esta asignado a este almacen!`,
      );
    }
    await this._usuarioAlmacenRepository.obtenerPodId(UsuarioAlmacenID);
    const uAlmacenEditado: UsuarioAlmacen = await this._usuarioAlmacenRepository.editar(
      usuarioAlmacen,
      UsuarioAlmacenID,
    );
    return plainToClass(LeerUsuarioAlmacenDto, uAlmacenEditado);
  }
}
