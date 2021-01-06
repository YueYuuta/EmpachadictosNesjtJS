import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerCantonDto } from '../api/dto';
import { ICantonCasoUso } from './ICantonCasoUso';
import { Canton } from '../entidades/canton.entity';

const CantonRepo = () => Inject('CantonRepo');

@Injectable()
export class LeerCantonCasoUso {
  constructor(
    @CantonRepo() private readonly _cantonRepository: ICantonCasoUso,
  ) {}

  async obtenerProId(CantonID: number): Promise<LeerCantonDto> {
    const canton = await this._cantonRepository.obtenerPodId(CantonID);
    return plainToClass(LeerCantonDto, canton);
  }

  async obtener(): Promise<LeerCantonDto[]> {
    const cantones: Canton[] = await this._cantonRepository.obtener();
    return cantones.map((canton: Canton) =>
      plainToClass(LeerCantonDto, canton),
    );
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerCantonDto[]> {
    let cantones: any;
    if (termino) {
      termino = termino.trim();
      cantones = await this._cantonRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      cantones = await this._cantonRepository.obtenerPaginado(desde, limite);
    }
    return cantones.map((canton: any) => plainToClass(LeerCantonDto, canton));
  }
}
