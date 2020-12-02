import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LeerUsuarioAlmacenCasoUso } from '../usuario-almacen-caso-uso/leer';

@Injectable()
export class UalmacenParamsGuard implements CanActivate {
  constructor(
    private readonly _usuarioAlmacenService: LeerUsuarioAlmacenCasoUso,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const AlmacenID: number = request.params.id;
    const UsuarioID: number = request.user.UsuarioID;
    await this._usuarioAlmacenService.validarExiste(UsuarioID, AlmacenID);

    return true;
  }
}
