import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { MesaModel } from './models/mesa';
import { LeerMesaDto } from '../api/dto';
import { IMesaCasoUso } from './IMesaCasoUso';
import { Mesa } from '../entidades/mesa.entity';
import { CambiarMesaDto } from '../api/dto/cambiar-mesa.dto';

const MesaRepo = () => Inject('MesaRepo');

@Injectable()
export class CrearMesaCasoUso {
  constructor(@MesaRepo() private readonly _mesaRepository: IMesaCasoUso) {}

  async crear(mesa: MesaModel): Promise<LeerMesaDto> {
    // mesa.Descripcion = mesa.Descripcion.toUpperCase();
    const nombreMesa = await this._mesaRepository.verificarNombre(
      mesa.Descripcion,
      mesa.AlmacenID,
    );
    if (nombreMesa) {
      throw new ConflictException(`La mesa: ${mesa.Descripcion}, ya existe!`);
    }
    const mesaGuardado: Mesa = await this._mesaRepository.crear(mesa);
    return plainToClass(LeerMesaDto, mesaGuardado);
  }
  async OcuparMesa(
    cambioMesa: CambiarMesaDto,
    MesaID: number,
  ): Promise<boolean> {
    await this._mesaRepository.obtenerPodId(MesaID);
    return await this._mesaRepository.ocuparMesa(cambioMesa, MesaID);
  }
}
