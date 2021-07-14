import { LeerProductoCasoUso } from '@modulos/producto/producto-caso-uso/leer';
import { SharedService } from '@modulos/shared/services/shared.service';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { LeerProductoDto } from '@modulos/producto/api/dto';
import { TipoVariable } from '@utils/enums';
import { IDespacharCasoUso } from './IDespacharCasoUso';
import { DespacharGateway } from '../gateway/despachar.gateway';

const DespacharRepo = () => Inject('DespacharRepo');

@Injectable()
export class EditarDespacharCasoUso {
  constructor(
    @DespacharRepo() private readonly _despacharRepository: IDespacharCasoUso,
  ) {}

  async cambiarEstadoDespacharTipoDetalle(
    DespacharDetalleID: number,
    EstadoDespachar: boolean,
  ): Promise<boolean> {
    // await this._despacharRepository.obtenerPodIdDetalle(DespacharDetalleID);
    const salida = await this._despacharRepository.cambiarEstadoDespacharTipoDetalle(
      DespacharDetalleID,
      EstadoDespachar,
    );

    return salida;
  }

  async cambiarEstadoDespacharDetalle(
    DespacharDetalleID: number,
    EstadoDespachar: boolean,
  ): Promise<boolean> {
    // await this._despacharRepository.obtenerPodIdDetalle(DespacharDetalleID);
    return await this._despacharRepository.cambiarEstadoDespacharDetalle(
      DespacharDetalleID,
      EstadoDespachar,
    );
  }
  async cambiarEstadoDespachar(
    DespacharID: number,
    EstadoDespachar: boolean,
  ): Promise<boolean> {
    await this._despacharRepository.obtenerPodId(DespacharID);
    return await this._despacharRepository.cambiarEstadoDespachar(
      DespacharID,
      EstadoDespachar,
    );
  }

  async cambiarEstadoDespacharPrincipal(
    DespacharID: number,
    EstadoDespachar: boolean,
  ): Promise<boolean> {
    await this._despacharRepository.obtenerPodId(DespacharID);
    return await this._despacharRepository.cambiarEstadoDespacharPrincipal(
      DespacharID,
      EstadoDespachar,
    );
  }

  async cambiarEstadoNotificacionDespachar(
    DespacharID: number,
    EstadoDespachar: boolean,
  ): Promise<boolean> {
    await this._despacharRepository.obtenerPodId(DespacharID);
    return await this._despacharRepository.cambiarEstadoNotificacionDespachar(
      DespacharID,
      EstadoDespachar,
    );
  }
}
