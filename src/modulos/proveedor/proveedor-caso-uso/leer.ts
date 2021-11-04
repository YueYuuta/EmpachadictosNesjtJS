import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { LeerProveedorDto } from '../api/dto/leer-proveedor.dto';
import { IProveedorCasoUso } from './IProveedorCasoUso';

const ProveedorRepo = () => Inject('ProveedorRepo');

@Injectable()
export class LeerProveedorCasoUso {
  constructor(
    @ProveedorRepo() private readonly _proveedorRepository: IProveedorCasoUso,
  ) {}

  async obtenerProId(ProveedorID: number): Promise<LeerProveedorDto> {
    const proveedor = await this._proveedorRepository.obtenerPodId(ProveedorID);
    return plainToClass(LeerProveedorDto, proveedor);
  }

  async obtenerPaginado(
    desde: number,
    limite: number,
    termino?: string,
  ): Promise<LeerProveedorDto[]> {
    let proveedors: any;
    if (termino) {
      termino = termino.trim();
      proveedors = await this._proveedorRepository.obtenerPorBusqueda(
        desde,
        limite,
        termino,
      );
    } else {
      proveedors = await this._proveedorRepository.obtenerPaginado(
        desde,
        limite,
      );
    }
    return proveedors.map((proveedor: any) =>
      plainToClass(LeerProveedorDto, proveedor),
    );
  }
}
