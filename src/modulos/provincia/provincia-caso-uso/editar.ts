import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IProvinciaCasoUso } from './IProvinciaCasoUso';
import { ProvinciaModel } from './models/provincia';

const ProvinciaRepo = () => Inject('ProvinciaRepo');

@Injectable()
export class EditarProvinciaCasoUso {
  constructor(
    @ProvinciaRepo() private readonly _provinciaRepository: IProvinciaCasoUso,
  ) {}

  async editar(
    provincia: ProvinciaModel,
    ProvinciaID: number,
  ): Promise<boolean> {
    // provincia.Nombre = provincia.Nombre.toUpperCase();
    const nombreProvincia = await this._provinciaRepository.verificarNombreEditar(
      provincia.Nombre,
      ProvinciaID,
    );
    if (nombreProvincia) {
      throw new ConflictException(
        `La provincia: ${provincia.Nombre}, ya existe!`,
      );
    }
    await this._provinciaRepository.obtenerPodId(ProvinciaID);
    const provinciaEditado: boolean = await this._provinciaRepository.editar(
      provincia,
      ProvinciaID,
    );
    return provinciaEditado;
  }
}
