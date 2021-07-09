import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerDespacharDto } from '../api/dto/leer-despachar.dto';

import { IDespacharCasoUso } from './IDespacharCasoUso';

const DespacharRepo = () => Inject('DespacharRepo');

@Injectable()
export class LeerDespacharCasoUso {
  constructor(
    @DespacharRepo() private readonly _despacharRepository: IDespacharCasoUso,
  ) {}

  async obtenerProId(DespacharID: number): Promise<LeerDespacharDto> {
    const despachar = await this._despacharRepository.obtenerPodId(DespacharID);
    return plainToClass(LeerDespacharDto, despachar);
  }

  async obtenerTodos(AlmacenID: number): Promise<LeerDespacharDto[]> {
    const despachars = await this._despacharRepository.obtenerTodos(AlmacenID);
    return despachars.map((despachar: any) =>
      plainToClass(LeerDespacharDto, despachar),
    );
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    AlmacenID: number,
    termino?: string,
  ): Promise<LeerDespacharDto[]> {
    let despachars: any;
    if (termino) {
      termino = termino.trim();
      despachars = await this._despacharRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
        AlmacenID,
      );
    } else {
      despachars = await this._despacharRepository.obtenerPaginado(
        desde,
        limite,
        AlmacenID,
      );
    }
    return despachars.map((despachar: any) =>
      plainToClass(LeerDespacharDto, despachar),
    );
  }
}
