import { Inject, Injectable } from '@nestjs/common';
import { IAlmacenCasoUso } from './IAlmacenCasoUso';
import { plainToClass } from 'class-transformer';
import { LeerAlmacenDto } from '../api/dto/leer-almacen.dto';
import { Almacen } from '../entidates/almacen.entity';

const AlmacenRepo = () => Inject('AlmacenRepo');

@Injectable()
export class LeerAlmacenCasoUso {
  constructor(
    @AlmacenRepo() private readonly _almacenRepository: IAlmacenCasoUso,
  ) {}

  async obtenerProId(AlmacenID: number): Promise<LeerAlmacenDto> {
    const usuario = await this._almacenRepository.obtenerPodId(AlmacenID);
    return plainToClass(LeerAlmacenDto, usuario);
  }

  async obtener(): Promise<LeerAlmacenDto[]> {
    const almacenes: Almacen[] = await this._almacenRepository.obtener();
    return almacenes.map((almacen: Almacen) =>
      plainToClass(LeerAlmacenDto, almacen),
    );
  }
  async obtenerProBusqueda(termino: string): Promise<LeerAlmacenDto[]> {
    const almacenes = await this._almacenRepository.obtenerPorBusqueda(termino);
    return almacenes.map(almacen => plainToClass(LeerAlmacenDto, almacen));
  }
  async obtenerPaginado(
    desde: number,
    limite: number,
  ): Promise<LeerAlmacenDto[]> {
    const almacenes = await this._almacenRepository.obtenerPaginado(
      desde,
      limite,
    );
    return almacenes.map(almacen => plainToClass(LeerAlmacenDto, almacen));
  }
}
