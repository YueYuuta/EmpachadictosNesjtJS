import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { IDespacharCasoUso } from './IDespacharCasoUso';
import { DespacharModel } from './models/despachar.model';

import { LeerDespacharDto } from '../api/dto/leer-despachar.dto';

const Despacharepo = () => Inject('DespacharRepo');

@Injectable()
export class CrearDespacharCasoUso {
  constructor(
    @Despacharepo() private readonly _despacharRepository: IDespacharCasoUso,
  ) {}

  async crear(despachar: DespacharModel): Promise<LeerDespacharDto> {
    console.log('lo que llega al crear un despachar', despachar);
    if (despachar.Detalle.length === 0) {
      throw new NotFoundException('Igrese el detalle del despachar!');
    }
    const despacharGuardado = await this._despacharRepository.crear(despachar);
    return plainToClass(LeerDespacharDto, despacharGuardado);
    // return despachar;
    // return plainToClass(LeerPedidoDto, despacharGuardado);
  }
}
