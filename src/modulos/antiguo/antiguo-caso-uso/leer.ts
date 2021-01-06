import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerAntiguoDto } from '../api/dto';
import { IAntiguoCasoUso } from './IAntiguoCasoUso';

const AntiguoRepo = () => Inject('AntiguoRepo');

@Injectable()
export class LeerAntiguoCasoUso {
  constructor(
    @AntiguoRepo()
    private readonly _antiguoRepository: IAntiguoCasoUso,
  ) {}

  async obtenerProId(AntiguoID: number): Promise<LeerAntiguoDto> {
    const antiguo = await this._antiguoRepository.obtenerPodId(AntiguoID);
    return plainToClass(LeerAntiguoDto, antiguo);
  }

  async obtener(): Promise<LeerAntiguoDto[]> {
    const antiguos: LeerAntiguoDto[] = await this._antiguoRepository.obtener();
    return antiguos.map((antiguo: LeerAntiguoDto) =>
      plainToClass(LeerAntiguoDto, antiguo),
    );
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerAntiguoDto[]> {
    let antiguos: any;
    if (termino) {
      termino = termino.trim();
      antiguos = await this._antiguoRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      antiguos = await this._antiguoRepository.obtenerPaginado(desde, limite);
    }
    return antiguos.map((antiguo: any) =>
      plainToClass(LeerAntiguoDto, antiguo),
    );
  }
}
