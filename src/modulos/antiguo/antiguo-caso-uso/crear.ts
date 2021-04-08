import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { AntiguoModel } from './models/antiguo';
import { LeerAntiguoDto } from '../api/dto';
import { IAntiguoCasoUso } from './IAntiguoCasoUso';
import { Antiguo } from '../entidades/antiguo.entity';

const AntiguoRepo = () => Inject('AntiguoRepo');

@Injectable()
export class CrearAntiguoCasoUso {
  constructor(
    @AntiguoRepo()
    private readonly _antiguoRepository: IAntiguoCasoUso,
  ) {}

  async crear(antiguo: AntiguoModel): Promise<LeerAntiguoDto> {
    antiguo.Descripcion = antiguo.Descripcion.toUpperCase();
    const nombreAntiguo = await this._antiguoRepository.verificarNombre(
      antiguo.Descripcion,
    );
    if (nombreAntiguo) {
      throw new ConflictException(
        `La antiguo: ${antiguo.Descripcion}, ya existe!`,
      );
    }
    const antiguoGuardado: Antiguo = await this._antiguoRepository.crear(
      antiguo,
    );
    return plainToClass(LeerAntiguoDto, antiguoGuardado);
  }
}
