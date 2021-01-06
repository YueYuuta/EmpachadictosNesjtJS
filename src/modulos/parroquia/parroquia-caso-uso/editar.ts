import { LeerCantonCasoUso } from '@modulos/canton/canton-caso-uso/leer';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IParroquiaCasoUso } from './IParroquiaCasoUso';
import { ParroquiaModel } from './models/parroquia';

const ParroquiaRepo = () => Inject('ParroquiaRepo');

@Injectable()
export class EditarParroquiaCasoUso {
  constructor(
    @ParroquiaRepo() private readonly _parroquiaRepository: IParroquiaCasoUso,
    private readonly cantonService: LeerCantonCasoUso,
  ) {}

  async editar(
    parroquia: ParroquiaModel,
    ParroquiaID: number,
  ): Promise<boolean> {
    // parroquia.Nombre = parroquia.Nombre.toUpperCase();
    await this.cantonService.obtenerProId(parroquia.Canton);

    const nombreParroquia = await this._parroquiaRepository.verificarNombreEditar(
      parroquia.Nombre,
      ParroquiaID,
    );
    if (nombreParroquia) {
      throw new ConflictException(
        `La parroquia: ${parroquia.Nombre}, ya existe!`,
      );
    }
    await this._parroquiaRepository.obtenerPodId(ParroquiaID);
    const parroquiaEditado: boolean = await this._parroquiaRepository.editar(
      parroquia,
      ParroquiaID,
    );
    return parroquiaEditado;
  }
}
