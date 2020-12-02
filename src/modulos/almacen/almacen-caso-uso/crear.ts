import { Inject, Injectable } from '@nestjs/common';
import { IAlmacenCasoUso } from './IAlmacenCasoUso';
import { CrearAlmacenDto, LeerAlmacenDto } from '../api/dto';
import { Variables } from '@utils/manejo-variables/variables';
import { Almacen } from '../entidates/almacen.entity';
import { plainToClass } from 'class-transformer';
import { AlmacenModel } from './models/almacen';

const AlmacenRepo = () => Inject('AlmacenRepo');

@Injectable()
export class CrearAlmacenCasoUso {
  constructor(
    @AlmacenRepo() private readonly _almacenRepository: IAlmacenCasoUso,
  ) {}

  async crear(almacen: CrearAlmacenDto): Promise<LeerAlmacenDto> {
    const almacenLimpio: AlmacenModel = Variables.limpiarVariables(almacen);
    const almacenGuardado: Almacen = await this._almacenRepository.crear(
      almacenLimpio,
    );
    return plainToClass(LeerAlmacenDto, almacenGuardado);
  }
}
