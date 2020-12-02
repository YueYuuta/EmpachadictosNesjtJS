import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUsuarioAlmacenCasoUso } from './IUsuarioAlmacenCasoUso';
import { plainToClass } from 'class-transformer';
import { LeerUsuarioAlmacenDto } from '../api/dto/leer-usuario-almacen.dto';
import { UsuarioAlmacen } from '../entidates/usuario-almacen.entity';
import { LeerUsuarioCasoUso } from '@modulos/usuario/usuario-caso-uso/leer';
import { LeerAlmacenCasoUso } from '@modulos/almacen/almacen-caso-uso/leer';

const UsuarioAlmacenRepo = () => Inject('UsuarioAlmacenRepo');

@Injectable()
export class LeerUsuarioAlmacenCasoUso {
  constructor(
    @UsuarioAlmacenRepo()
    private readonly _usuarioAlmacenRepository: IUsuarioAlmacenCasoUso,
    private readonly _usuarioService: LeerUsuarioCasoUso,
    private readonly _almacenService: LeerAlmacenCasoUso,
  ) {}

  async obtenerProId(UsuarioAlmacenID: number): Promise<LeerUsuarioAlmacenDto> {
    const usuario = await this._usuarioAlmacenRepository.obtenerPodId(
      UsuarioAlmacenID,
    );
    return plainToClass(LeerUsuarioAlmacenDto, usuario);
  }

  async obtener(): Promise<LeerUsuarioAlmacenDto[]> {
    const uAlmacenes: UsuarioAlmacen[] = await this._usuarioAlmacenRepository.obtener();
    return uAlmacenes.map((usuarioAlmacen: UsuarioAlmacen) =>
      plainToClass(LeerUsuarioAlmacenDto, usuarioAlmacen),
    );
  }
  async obtenerProBusqueda(termino: string): Promise<LeerUsuarioAlmacenDto[]> {
    const uAlmacenes = await this._usuarioAlmacenRepository.obtenerPorBusqueda(
      termino,
    );
    return uAlmacenes.map((usuarioAlmacen: any) =>
      plainToClass(LeerUsuarioAlmacenDto, usuarioAlmacen),
    );
  }
  async obtenerPaginado(
    desde: number,
    limite: number,
  ): Promise<LeerUsuarioAlmacenDto[]> {
    const uAlmacenes = await this._usuarioAlmacenRepository.obtenerPaginado(
      desde,
      limite,
    );
    return uAlmacenes.map((usuarioAlmacen: any) =>
      plainToClass(LeerUsuarioAlmacenDto, usuarioAlmacen),
    );
  }

  async obtenerPorUsuario(UsuarioID: number): Promise<LeerUsuarioAlmacenDto[]> {
    await this._usuarioService.obtenerProId(UsuarioID);
    const uAlmacenes = await this._usuarioAlmacenRepository.obtenerPorUsuario(
      UsuarioID,
    );
    return uAlmacenes.map((usuarioAlmacen: any) =>
      plainToClass(LeerUsuarioAlmacenDto, usuarioAlmacen),
    );
  }
  async obtenerPorAlmacen(ALmacenID: number): Promise<LeerUsuarioAlmacenDto[]> {
    await this._almacenService.obtenerProId(ALmacenID);
    const uAlmacenes = await this._usuarioAlmacenRepository.obtenerPorAlmacen(
      ALmacenID,
    );
    return uAlmacenes.map((usuarioAlmacen: any) =>
      plainToClass(LeerUsuarioAlmacenDto, usuarioAlmacen),
    );
  }

  async validarExiste(
    UsuarioID: number,
    AlmacenID: number,
  ): Promise<LeerUsuarioAlmacenDto> {
    const existe = await this._usuarioAlmacenRepository.validarExiste(
      UsuarioID,
      AlmacenID,
    );
    if (!existe) {
      throw new UnauthorizedException(
        `El usuario y el almacen no coiciden por favor comuniquese con el administrador!`,
      );
    }
    return plainToClass(LeerUsuarioAlmacenDto, existe);
  }
}
