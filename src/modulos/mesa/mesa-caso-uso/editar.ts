import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IMesaCasoUso } from './IMesaCasoUso';
import { MesaModel } from './models/mesa';

const MesaRepo = () => Inject('MesaRepo');

@Injectable()
export class EditarMesaCasoUso {
  constructor(@MesaRepo() private readonly _mesaRepository: IMesaCasoUso) {}

  async editar(mesa: MesaModel, MesaID: number): Promise<boolean> {
    // mesa.Descripcion = mesa.Descripcion.toUpperCase();
    const mesaBd = await this._mesaRepository.obtenerPodId(MesaID);
    const nombreMesa = await this._mesaRepository.verificarNombreEditar(
      mesa.Descripcion,
      MesaID,
      mesaBd.AlmacenID,
    );
    if (nombreMesa) {
      throw new ConflictException(`La mesa: ${mesa.Descripcion}, ya existe!`);
    }
    const mesaEditado: boolean = await this._mesaRepository.editar(
      mesa,
      MesaID,
    );
    return mesaEditado;
  }
}
