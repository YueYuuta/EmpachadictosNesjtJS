import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUsuarioAlmacenCasoUso } from './IUsuarioAlmacenCasoUso';
import { Variables } from '@utils/manejo-variables/variables';
import { UsuarioAlmacen } from '../entidates/usuario-almacen.entity';
import { plainToClass } from 'class-transformer';
import { CrearUsuarioAlmacenDto, LeerUsuarioAlmacenDto } from '../api/dto';
import { LeerUsuarioCasoUso } from '@modulos/usuario/usuario-caso-uso/leer';
import { LeerAlmacenCasoUso } from '@modulos/almacen/almacen-caso-uso/leer';
import { UsuarioAlmacenModel } from './models/usuario-almacen';

const UsuarioAlmacenRepo = () => Inject('UsuarioAlmacenRepo');

@Injectable()
export class CrearUsuarioAlmacenCasoUso {
  constructor(
    @UsuarioAlmacenRepo()
    private readonly _usuarioAlmacenRepository: IUsuarioAlmacenCasoUso,
    private readonly _usuarioService: LeerUsuarioCasoUso,
    private readonly _almacenService: LeerAlmacenCasoUso,
  ) {}

  async crear(
    usuarioAlmacen: CrearUsuarioAlmacenDto,
  ): Promise<LeerUsuarioAlmacenDto> {
    const uAlmacenLimpio: UsuarioAlmacenModel = Variables.limpiarVariables(
      usuarioAlmacen,
    );
    const { Almacen, Usuario } = uAlmacenLimpio;

    await this._usuarioService.obtenerProId(Usuario);
    await this._almacenService.obtenerProId(Almacen);

    const existe = await this._usuarioAlmacenRepository.validarExiste(
      Usuario,
      Almacen,
    );
    if (existe) {
      throw new ConflictException(
        `El usuario ya esta asignado a este almacen!`,
      );
    }
    const uAlmacenGuardado: UsuarioAlmacen = await this._usuarioAlmacenRepository.crear(
      uAlmacenLimpio,
    );

    return plainToClass(LeerUsuarioAlmacenDto, uAlmacenGuardado);
  }
}
