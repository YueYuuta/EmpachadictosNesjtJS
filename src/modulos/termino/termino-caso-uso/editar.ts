import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ITerminoCasoUso } from './ITerminoCasoUso';
import { TerminoModel } from './models/termino';

const TerminoRepo = () => Inject('TerminoRepo');

@Injectable()
export class EditarTerminoCasoUso {
  constructor(
    @TerminoRepo() private readonly _terminoRepository: ITerminoCasoUso,
  ) {}

  async editar(termino: TerminoModel, TerminoID: number): Promise<boolean> {
    // termino.Descripcion = termino.Descripcion.toUpperCase();
    const nombreTermino = await this._terminoRepository.verificarNombreEditar(
      termino.Descripcion,
      TerminoID,
    );
    if (nombreTermino) {
      throw new ConflictException(
        `La termino: ${termino.Descripcion}, ya existe!`,
      );
    }
    await this._terminoRepository.obtenerPodId(TerminoID);
    const terminoEditado: boolean = await this._terminoRepository.editar(
      termino,
      TerminoID,
    );
    return terminoEditado;
  }
}
