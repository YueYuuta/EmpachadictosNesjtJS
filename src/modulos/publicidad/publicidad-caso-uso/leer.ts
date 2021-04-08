import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerPublicidadDto } from '../api/dto';
import { IPublicidadCasoUso } from './IPublicidadCasoUso';

const PublicidadRepo = () => Inject('PublicidadRepo');

@Injectable()
export class LeerPublicidadCasoUso {
  constructor(
    @PublicidadRepo()
    private readonly _publicidadRepository: IPublicidadCasoUso,
  ) {}

  async obtenerProId(PublicidadID: number): Promise<LeerPublicidadDto> {
    const publicidad = await this._publicidadRepository.obtenerPodId(
      PublicidadID,
    );
    return plainToClass(LeerPublicidadDto, publicidad);
  }

  async obtener(): Promise<LeerPublicidadDto[]> {
    const publicidads: LeerPublicidadDto[] = await this._publicidadRepository.obtener();
    return publicidads.map((publicidad: LeerPublicidadDto) =>
      plainToClass(LeerPublicidadDto, publicidad),
    );
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerPublicidadDto[]> {
    let publicidads: any;
    if (termino) {
      termino = termino.trim();
      publicidads = await this._publicidadRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      publicidads = await this._publicidadRepository.obtenerPaginado(
        desde,
        limite,
      );
    }
    return publicidads.map((publicidad: any) =>
      plainToClass(LeerPublicidadDto, publicidad),
    );
  }
}
