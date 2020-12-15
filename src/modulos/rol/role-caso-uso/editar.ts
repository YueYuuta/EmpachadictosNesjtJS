import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { RolModel } from './models/rol';
import { IRolCasoUso } from './IRolCasoUso';
import { Variables } from '@utils/manejo-variables/variables';
import { CrearRolDto } from '../api/dto/crear-rol.dto';

const RolRepo = () => Inject('RolRepo');

@Injectable()
export class EditarRoleCasoUso {
  constructor(@RolRepo() private readonly _rolRepository: IRolCasoUso) {}

  async editar(RolID: number, rol: CrearRolDto): Promise<boolean> {
    if (rol.RolPermiso.length < 1) {
      throw new ConflictException(
        `El rol debe costar de una ruta principal para funcionar correctamente!`,
      );
    }
    await this._rolRepository.obtenerPorId(RolID);
    const rolLimpio: RolModel = Variables.limpiarVariables(rol);

    const nombreMayuscula = rolLimpio.Nombre.toUpperCase();
    const existeRol = await this._rolRepository.nombreRolExisteEditar(
      RolID,
      nombreMayuscula,
    );
    if (existeRol) {
      throw new ConflictException(
        `El rol con nombre: ${nombreMayuscula} ya existe!`,
      );
    }
    rolLimpio.Nombre = nombreMayuscula;
    for (const permiso of rol.RolPermiso) {
      await this._rolRepository.obtenerPermisoPorId(permiso.Permiso);
    }

    const rolGuardado = await this._rolRepository.editar(RolID, rolLimpio);
    return rolGuardado;
  }
}
