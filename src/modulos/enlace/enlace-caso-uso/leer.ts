import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerEnlaceDto } from '../api/dto';
import { IEnlaceCasoUso } from './IEnlaceCasoUso';
import { Enlace } from '../entidades/enlace.entity';

const EnlaceRepo = () => Inject('EnlaceRepo');

@Injectable()
export class LeerEnlaceCasoUso {
  constructor(
    @EnlaceRepo() private readonly _enlacenRepository: IEnlaceCasoUso,
  ) {}

  async obtenerProId(EnlaceID: number): Promise<LeerEnlaceDto> {
    const enlacen = await this._enlacenRepository.obtenerPodId(EnlaceID);
    return plainToClass(LeerEnlaceDto, enlacen);
  }

  async obtener(): Promise<LeerEnlaceDto[]> {
    const enlaces: Enlace[] = await this._enlacenRepository.obtener();
    return enlaces.map((enlacen: Enlace) =>
      plainToClass(LeerEnlaceDto, enlacen),
    );
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerEnlaceDto[]> {
    let enlaces: any;
    if (termino) {
      termino = termino.trim();
      enlaces = await this._enlacenRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      enlaces = await this._enlacenRepository.obtenerPaginado(desde, limite);
    }
    return enlaces.map((enlacen: any) => plainToClass(LeerEnlaceDto, enlacen));
  }
}
