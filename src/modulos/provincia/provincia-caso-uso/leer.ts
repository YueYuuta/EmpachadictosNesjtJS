import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerProvinciaDto } from '../api/dto';
import { IProvinciaCasoUso } from './IProvinciaCasoUso';

const ProvinciaRepo = () => Inject('ProvinciaRepo');

@Injectable()
export class LeerProvinciaCasoUso {
  constructor(
    @ProvinciaRepo() private readonly _provinciaRepository: IProvinciaCasoUso,
  ) {}

  async obtenerProId(ProvinciaID: number): Promise<LeerProvinciaDto> {
    const provincia = await this._provinciaRepository.obtenerPodId(ProvinciaID);
    return plainToClass(LeerProvinciaDto, provincia);
  }

  async obtener(): Promise<LeerProvinciaDto[]> {
    const provincias: LeerProvinciaDto[] = await this._provinciaRepository.obtener();
    return provincias.map((provincia: LeerProvinciaDto) =>
      plainToClass(LeerProvinciaDto, provincia),
    );
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerProvinciaDto[]> {
    let provincias: any;
    if (termino) {
      termino = termino.trim();
      provincias = await this._provinciaRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      provincias = await this._provinciaRepository.obtenerPaginado(
        desde,
        limite,
      );
    }
    return provincias.map((provincia: any) =>
      plainToClass(LeerProvinciaDto, provincia),
    );
  }
}
