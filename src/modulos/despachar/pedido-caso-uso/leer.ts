import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { plainToClass } from 'class-transformer';
import { LeerDespacharDto } from '../api/dto/leer-despachar.dto';
import { DespacharGateway } from '../gateway/despachar.gateway';

import { IDespacharCasoUso } from './IDespacharCasoUso';

const DespacharRepo = () => Inject('DespacharRepo');

@Injectable()
export class LeerDespacharCasoUso {
  private logger = new Logger('cron');
  constructor(
    @DespacharRepo() private readonly _despacharRepository: IDespacharCasoUso,
    private readonly _despacharGateway: DespacharGateway,
  ) {}

  async obtenerProId(DespacharID: number): Promise<LeerDespacharDto> {
    const despachar = await this._despacharRepository.obtenerPodId(DespacharID);
    return plainToClass(LeerDespacharDto, despachar);
  }

  async obtenerProIdDespachar(DespacharID: number): Promise<LeerDespacharDto> {
    const despachar = await this._despacharRepository.obtenerPodIdDespachar(
      DespacharID,
    );
    return plainToClass(LeerDespacharDto, despachar);
  }

  async obtenerTodos(AlmacenID: number): Promise<LeerDespacharDto[]> {
    const despachars = await this._despacharRepository.obtenerTodos(AlmacenID);
    console.log(despachars);
    return despachars.map((despachar: any) =>
      plainToClass(LeerDespacharDto, despachar),
    );
  }

  async obtenerTodosPorTipo(
    AlmacenID: number,
    tipo: string,
  ): Promise<LeerDespacharDto[]> {
    const despachars = await this._despacharRepository.obtenerTodosPorTipo(
      AlmacenID,
      tipo,
    );
    console.log(despachars);
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

  @Cron(CronExpression.EVERY_MINUTE)
  async verLosPedidosDormidos(): Promise<any> {
    const fechaLocal = new Date().toLocaleString('es-EC', {
      timeZone: 'America/Guayaquil',
    });
    const n = fechaLocal.lastIndexOf(' ');
    const fechaEnviar = fechaLocal.substring(n, fechaLocal.length - 3).trim();
    //saca en consola la cadena de texto hasta la ultima ocurencia de un espacio vacio

    // console.log('fechaaaaa', fechaLocal);
    this.logger.log('esto se esa ejecutando cada 5 segundos');
    const despachars = await this._despacharRepository.obtenerTodosDormidos(
      fechaEnviar,
    );
    for (const despachar of despachars) {
      await this._despacharRepository.cambiarEstadoDormido(
        despachar.DespacharID,
        false,
      );
      this._despacharGateway.pedidoDespertado(despachar);
    }
  }
}
