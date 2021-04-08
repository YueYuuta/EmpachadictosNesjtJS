import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IPublicidadCasoUso } from './IPublicidadCasoUso';
import { PublicidadModel } from './models/publicidad';

const PublicidadRepo = () => Inject('PublicidadRepo');

@Injectable()
export class EditarPublicidadCasoUso {
  constructor(
    @PublicidadRepo()
    private readonly _publicidadRepository: IPublicidadCasoUso,
  ) {}

  async editar(
    publicidad: PublicidadModel,
    PublicidadID: number,
  ): Promise<boolean> {
    publicidad.Descripcion = publicidad.Descripcion.toUpperCase();
    const nombrePublicidad = await this._publicidadRepository.verificarNombreEditar(
      publicidad.Descripcion,
      PublicidadID,
    );
    if (nombrePublicidad) {
      throw new ConflictException(
        `La publicidad: ${publicidad.Descripcion}, ya existe!`,
      );
    }
    await this._publicidadRepository.obtenerPodId(PublicidadID);
    const publicidadEditado: boolean = await this._publicidadRepository.editar(
      publicidad,
      PublicidadID,
    );
    return publicidadEditado;
  }
}
