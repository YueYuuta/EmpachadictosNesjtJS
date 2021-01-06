import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IEnlaceCasoUso } from './IEnlaceCasoUso';
import { EnlaceModel } from './models/enlace';
import { LeerPlanCasoUso } from '../../plan/plan-caso-uso/leer';

const EnlaceRepo = () => Inject('EnlaceRepo');

@Injectable()
export class EditarEnlaceCasoUso {
  constructor(
    @EnlaceRepo() private readonly _enlaceRepository: IEnlaceCasoUso,
    private readonly planService: LeerPlanCasoUso,
  ) {}

  async editar(enlace: EnlaceModel, EnlaceID: number): Promise<boolean> {
    // enlace.Nombre = enlace.Nombre.toUpperCase();
    await this.planService.obtenerProId(enlace.Plan);

    const nombreEnlace = await this._enlaceRepository.verificarNombreEditar(
      enlace.Descripcion,
      EnlaceID,
    );
    if (nombreEnlace) {
      throw new ConflictException(
        `El enlace: ${enlace.Descripcion}, ya existe!`,
      );
    }
    await this._enlaceRepository.obtenerPodId(EnlaceID);
    const enlaceEditado: boolean = await this._enlaceRepository.editar(
      enlace,
      EnlaceID,
    );
    return enlaceEditado;
  }
}
