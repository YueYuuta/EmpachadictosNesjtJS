import { LeerProductoCasoUso } from '@modulos/producto/producto-caso-uso/leer';
import { SharedService } from '@modulos/shared/services/shared.service';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { LeerProductoDto } from '@modulos/producto/api/dto';
import { TipoVariable } from '@utils/enums';
import { IDespacharCasoUso } from './IDespacharCasoUso';
import { DespacharGateway } from '../gateway/despachar.gateway';
import { DespacharModel } from './models/despachar.model';
import { LeerDespacharDto } from '../api/dto';
import { plainToClass } from 'class-transformer';

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

  async cambiarEstadoNotificacionDespacharTipo(
    DespacharID: number,
    EstadoDespacharTipo: boolean,
  ): Promise<boolean> {
    await this._despacharRepository.obtenerPodId(DespacharID);
    return await this._despacharRepository.cambiarEstadoNotificacionTipo(
      DespacharID,
      EstadoDespacharTipo,
    );
  }

  async editar(
    despachar: DespacharModel,
    DespacharID: number,
  ): Promise<LeerDespacharDto> {
    // console.log('lo que llega al crear un despachar', despachar);
    if (despachar.Detalle.length === 0) {
      throw new NotFoundException('Igrese el detalle del despachar!');
    }

    const despacharGuardado = await this._despacharRepository.editar(
      despachar,
      DespacharID,
    );
    for (const ingresar of despachar.Detalle) {
      ingresar.DespacharID = despacharGuardado.DespacharID;
      await this._despacharRepository.crearDetalle(ingresar);
    }
    return plainToClass(LeerDespacharDto, despacharGuardado);
    // return despachar;
    // return plainToClass(LeerPedidoDto, despacharGuardado);
  }

  async eliminarDetalle(
    despachar: DespacharModel,
    DespacharID: number,
  ): Promise<boolean> {
    // console.log('lo que llega al crear un despachar', despachar);
    if (despachar.Detalle.length === 0) {
      return true;
    }
    const detalle = await this._despacharRepository.obtenerdetallePorDespachar(
      DespacharID,
    );

    const despacharGuardado = await this._despacharRepository.editar(
      despachar,
      DespacharID,
    );
    for (const ingresar of despachar.Detalle) {
      // ingresar.DespacharID = despacharGuardado.DespacharID;
      await this._despacharRepository.eliminarDetalle(
        ingresar.DespacharDetalleID,
      );
    }
    return true;
    // return despachar;
    // return plainToClass(LeerPedidoDto, despacharGuardado);
  }
}
