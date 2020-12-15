import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LeerUsuarioCasoUso } from '../../usuario/usuario-caso-uso/leer';
import { LeerRolCasoUso } from '../role-caso-uso/leer';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _usuarioService: LeerUsuarioCasoUso,
    private readonly _rolService: LeerRolCasoUso,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let salida: number = 0;
    const ruta: string = this._reflector.get<string>(
      'ruta',
      context.getHandler(),
    );

    if (!ruta) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const usuario = await this._usuarioService.obtenerProId(user.UsuarioID);

    const rol = await this._rolService.obtenerPorId(usuario.Rol.RolID);
    const rolPermiso = await this._rolService.obtenerPermisosPorRole(rol.RolID);

    for (const permiso of rolPermiso) {
      if (permiso.Permiso.Ruta === ruta) {
        salida = 1;
        break;
      }
    }
    if (salida === 0) {
      throw new ForbiddenException(`No tiene aaceso a esta ruta!`);
    }

    return true;
  }
}
