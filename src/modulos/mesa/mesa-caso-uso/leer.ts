import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerMesaDto } from '../api/dto';
import { Mesa } from '../entidades/mesa.entity';
import { IMesaCasoUso } from './IMesaCasoUso';

const MesaRepo = () => Inject('MesaRepo');

@Injectable()
export class LeerMesaCasoUso {
  constructor(@MesaRepo() private readonly _planRepository: IMesaCasoUso) {}

  async obtenerProId(MesaID: number): Promise<LeerMesaDto> {
    const plan = await this._planRepository.obtenerPodId(MesaID);
    return plainToClass(LeerMesaDto, plan);
  }

  async obtener(AlmacenID: number): Promise<LeerMesaDto[]> {
    const planes: Mesa[] = await this._planRepository.obtener(AlmacenID);
    return planes.map((plan: Mesa) => plainToClass(LeerMesaDto, plan));
  }

  async obtenerPaginado(
    AlmacenID: number,
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerMesaDto[]> {
    let planes: any;
    if (termino) {
      termino = termino.trim();
      planes = await this._planRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
        AlmacenID,
      );
    } else {
      planes = await this._planRepository.obtenerPaginado(
        desde,
        limite,
        AlmacenID,
      );
    }
    return planes.map((plan: any) => plainToClass(LeerMesaDto, plan));
  }
}
