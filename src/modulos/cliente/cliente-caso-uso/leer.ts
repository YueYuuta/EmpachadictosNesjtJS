import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerClienteDto } from '../api/dto/leer-cliente.dto';
import { IClienteCasoUso } from './IClienteCasoUso';

const ClienteRepo = () => Inject('ClienteRepo');

@Injectable()
export class LeerClienteCasoUso {
  constructor(
    @ClienteRepo() private readonly _clienteRepository: IClienteCasoUso,
  ) {}

  async obtenerProId(ClienteID: number): Promise<LeerClienteDto> {
    const cliente = await this._clienteRepository.obtenerPodId(ClienteID);
    return plainToClass(LeerClienteDto, cliente);
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerClienteDto[]> {
    let clientes: any;
    if (termino) {
      termino = termino.trim();
      clientes = await this._clienteRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      clientes = await this._clienteRepository.obtenerPaginado(desde, limite);
    }
    return clientes.map((cliente: any) =>
      plainToClass(LeerClienteDto, cliente),
    );
  }
}
