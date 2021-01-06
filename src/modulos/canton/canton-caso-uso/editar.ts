import { LeerProvinciaCasoUso } from '@modulos/provincia/provincia-caso-uso/leer';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ICantonCasoUso } from './ICantonCasoUso';
import { CantonModel } from './models/canton';

const CantonRepo = () => Inject('CantonRepo');

@Injectable()
export class EditarCantonCasoUso {
  constructor(
    @CantonRepo() private readonly _cantonRepository: ICantonCasoUso,
    private readonly provinciaService: LeerProvinciaCasoUso,
  ) {}

  async editar(canton: CantonModel, CantonID: number): Promise<boolean> {
    // canton.Nombre = canton.Nombre.toUpperCase();
    await this.provinciaService.obtenerProId(canton.Provincia);

    const nombreCanton = await this._cantonRepository.verificarNombreEditar(
      canton.Nombre,
      CantonID,
    );
    if (nombreCanton) {
      throw new ConflictException(`La canton: ${canton.Nombre}, ya existe!`);
    }
    await this._cantonRepository.obtenerPodId(CantonID);
    const cantonEditado: boolean = await this._cantonRepository.editar(
      canton,
      CantonID,
    );
    return cantonEditado;
  }
}
