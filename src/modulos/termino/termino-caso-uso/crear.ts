import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { TerminoModel } from './models/termino';
import { LeerTerminoDto } from '../api/dto';
import { ITerminoCasoUso } from './ITerminoCasoUso';
import { Termino } from '../entidades/termino.entity';

const TerminoRepo = () => Inject('TerminoRepo');

@Injectable()
export class CrearTerminoCasoUso {
  constructor(
    @TerminoRepo() private readonly _terminoRepository: ITerminoCasoUso,
  ) {}

  async crear(termino: TerminoModel): Promise<LeerTerminoDto> {
    // termino.Descripcion = termino.Descripcion.toUpperCase();
    const nombreTermino = await this._terminoRepository.verificarNombre(
      termino.Descripcion,
    );
    if (nombreTermino) {
      throw new ConflictException(
        `La termino: ${termino.Descripcion}, ya existe!`,
      );
    }
    const terminoGuardado: Termino = await this._terminoRepository.crear(
      termino,
    );
    return plainToClass(LeerTerminoDto, terminoGuardado);
  }
}
