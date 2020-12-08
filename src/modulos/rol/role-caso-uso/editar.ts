import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { LeerRolDto } from '../api/dto/leer-rol.dto';
import { RolModel } from './models/rol';
import { Rol } from '../entidades/rol.entity';
import { IRolCasoUso } from './IRolCasoUso';
import { Variables } from '@utils/manejo-variables/variables';
import { plainToClass } from 'class-transformer';
import { CrearRolDto } from '../api/dto/crear-rol.dto';

const RolRepo = () => Inject('RolRepo');

@Injectable()
export class EditarRoleCasoUso {
  constructor(@RolRepo() private readonly _rolRepository: IRolCasoUso) {}

  async editar(RolID: number, rol: CrearRolDto): Promise<boolean> {
    await this._rolRepository.obtenerPodId(RolID);
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
