import { Inject, Injectable } from '@nestjs/common';
import { EditarAlmacenDto } from '../api/dto/editar-almacen.dto';
import { Almacen } from '../entidates/almacen.entity';
import { IAlmacenCasoUso } from './IAlmacenCasoUso';
import { plainToClass } from 'class-transformer';
import { LeerAlmacenDto } from '../api/dto/leer-almacen.dto';

const AlmacenRepo = () => Inject('AlmacenRepo');

@Injectable()
export class EditarAlmacenCasoUso {
  constructor(
    @AlmacenRepo() private readonly _almacenRepository: IAlmacenCasoUso,
  ) {}

  async editar(
    almacen: Partial<EditarAlmacenDto>,
    AlmacenID: number,
  ): Promise<LeerAlmacenDto> {
    await this._almacenRepository.obtenerPodId(AlmacenID);
    const almacenEditado: Almacen = await this._almacenRepository.editar(
      almacen,
      AlmacenID,
    );
    return plainToClass(LeerAlmacenDto, almacenEditado);
  }
}
