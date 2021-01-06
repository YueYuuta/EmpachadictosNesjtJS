import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerParroquiaDto } from '../api/dto';
import { IParroquiaCasoUso } from './IParroquiaCasoUso';
import { Parroquia } from '../entidades/parroquia.entity';

const ParroquiaRepo = () => Inject('ParroquiaRepo');

@Injectable()
export class LeerParroquiaCasoUso {
  constructor(
    @ParroquiaRepo() private readonly _parroquiaRepository: IParroquiaCasoUso,
  ) {}

  async obtenerProId(ParroquiaID: number): Promise<LeerParroquiaDto> {
    const parroquia = await this._parroquiaRepository.obtenerPodId(ParroquiaID);
    return plainToClass(LeerParroquiaDto, parroquia);
  }

  async obtener(): Promise<LeerParroquiaDto[]> {
    const parroquias: Parroquia[] = await this._parroquiaRepository.obtener();
    return parroquias.map((parroquia: Parroquia) =>
      plainToClass(LeerParroquiaDto, parroquia),
    );
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerParroquiaDto[]> {
    let parroquias: any;
    if (termino) {
      termino = termino.trim();
      parroquias = await this._parroquiaRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      parroquias = await this._parroquiaRepository.obtenerPaginado(
        desde,
        limite,
      );
    }
    return parroquias.map((parroquia: any) =>
      plainToClass(LeerParroquiaDto, parroquia),
    );
  }
}
