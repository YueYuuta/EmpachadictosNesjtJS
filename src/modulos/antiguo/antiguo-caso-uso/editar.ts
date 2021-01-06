import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IAntiguoCasoUso } from './IAntiguoCasoUso';
import { AntiguoModel } from './models/antiguo';

const AntiguoRepo = () => Inject('AntiguoRepo');

@Injectable()
export class EditarAntiguoCasoUso {
  constructor(
    @AntiguoRepo()
    private readonly _antiguoRepository: IAntiguoCasoUso,
  ) {}

  async editar(antiguo: AntiguoModel, AntiguoID: number): Promise<boolean> {
    antiguo.Descripcion = antiguo.Descripcion.toUpperCase();
    const nombreAntiguo = await this._antiguoRepository.verificarNombreEditar(
      antiguo.Descripcion,
      AntiguoID,
    );
    if (nombreAntiguo) {
      throw new ConflictException(
        `La antiguo: ${antiguo.Descripcion}, ya existe!`,
      );
    }
    await this._antiguoRepository.obtenerPodId(AntiguoID);
    const antiguoEditado: boolean = await this._antiguoRepository.editar(
      antiguo,
      AntiguoID,
    );
    return antiguoEditado;
  }
}
