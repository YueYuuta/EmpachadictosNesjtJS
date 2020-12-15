import { Inject, Injectable } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { IRolCasoUso } from './IRolCasoUso';
import { LeerRolDto } from '../api/dto/leer-rol.dto';
import { Rol } from '../entidades/rol.entity';
import { Permiso } from '../entidades/permiso.entity';
import { LeerPermisoDto } from '../api/dto/leer-permiso.dto';
import { LeerRolPermisoDto } from '../api/dto/leer-rol-permiso.dto';
import { RolPermiso } from '../entidades/rol-permiso.entity';

const RolRepo = () => Inject('RolRepo');

@Injectable()
export class LeerRolCasoUso {
  constructor(@RolRepo() private readonly _rolRepository: IRolCasoUso) {}

  async obtenerPorId(RolID: number): Promise<LeerRolDto> {
    const rol = await this._rolRepository.obtenerPorId(RolID);
    const rolPermiso = await this._rolRepository.obtenerPermisosPorRole(
      rol.RolID,
    );
    rol.RolPermiso = rolPermiso;

    return plainToClass(LeerRolDto, rol);
  }

  async obtenerRoles(): Promise<LeerRolDto[]> {
    const roles: Rol[] = await this._rolRepository.obtenerRoles();
    return roles.map((rol: Rol) => plainToClass(LeerRolDto, rol));
  }
  // async obtenerProBusqueda(termino: string): Promise<LeerUsuarioDto[]> {
  //   const usuarios = await this._rolRepository.obtenerPorBusqueda(termino);
  //   return usuarios.map(usuario => plainToClass(LeerUsuarioDto, usuario));
  // }

  async obtenerPermisos(): Promise<LeerPermisoDto[]> {
    const permisos: Permiso[] = await this._rolRepository.obtenerPermisos();
    return permisos.map((permiso: Permiso) =>
      plainToClass(LeerPermisoDto, permiso),
    );
  }

  async obtenerPermisosPorRole(RolID: number): Promise<LeerRolPermisoDto[]> {
    const permisos: RolPermiso[] = await this._rolRepository.obtenerPermisosPorRole(
      RolID,
    );
    return permisos.map((permiso: RolPermiso) =>
      plainToClass(LeerRolPermisoDto, permiso),
    );
  }
  async obtenerPaginado(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<LeerRolDto[]> {
    let roles: any;
    if (termino) {
      termino = termino.trim();
      roles = await this._rolRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      roles = await this._rolRepository.obtenerPaginado(desde, limite);
    }
    return roles.map((rol: any) => plainToClass(LeerRolDto, rol));
  }
}
