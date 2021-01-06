import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerTerminoDto } from '../api/dto';
import { ITerminoCasoUso } from './ITerminoCasoUso';

const TerminoRepo = () => Inject('TerminoRepo');

@Injectable()
export class LeerTerminoCasoUso {
  constructor(
    @TerminoRepo() private readonly _terminoRepository: ITerminoCasoUso,
  ) {}

  async obtenerProId(TerminoID: number): Promise<LeerTerminoDto> {
    const termino = await this._terminoRepository.obtenerPodId(TerminoID);
    return plainToClass(LeerTerminoDto, termino);
  }

  async obtener(): Promise<LeerTerminoDto[]> {
    const terminos: LeerTerminoDto[] = await this._terminoRepository.obtener();
    return terminos.map((termino: LeerTerminoDto) =>
      plainToClass(LeerTerminoDto, termino),
    );
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerTerminoDto[]> {
    let terminos: any;
    if (termino) {
      termino = termino.trim();
      terminos = await this._terminoRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      terminos = await this._terminoRepository.obtenerPaginado(desde, limite);
    }
    return terminos.map((termino: any) =>
      plainToClass(LeerTerminoDto, termino),
    );
  }
}
