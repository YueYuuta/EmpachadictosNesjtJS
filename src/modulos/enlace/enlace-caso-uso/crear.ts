import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { EnlaceModel } from './models/enlace';
import { LeerEnlaceDto } from '../api/dto';
import { IEnlaceCasoUso } from './IEnlaceCasoUso';
import { Enlace } from '../entidades/enlace.entity';
import { LeerPlanCasoUso } from '../../plan/plan-caso-uso/leer';

const EnlaceRepo = () => Inject('EnlaceRepo');

@Injectable()
export class CrearEnlaceCasoUso {
  constructor(
    @EnlaceRepo() private readonly _enlaceRepository: IEnlaceCasoUso,
    private readonly planService: LeerPlanCasoUso,
  ) {}

  async crear(enlace: EnlaceModel): Promise<LeerEnlaceDto> {
    await this.planService.obtenerProId(enlace.Plan);
    // enlace.Nombre = enlace.Nombre.toUpperCase();
    const nombreEnlace = await this._enlaceRepository.verificarNombre(
      enlace.Descripcion,
    );
    if (nombreEnlace) {
      throw new ConflictException(
        `El enlace: ${enlace.Descripcion}, ya existe!`,
      );
    }
    const enlaceGuardado: Enlace = await this._enlaceRepository.crear(enlace);
    return plainToClass(LeerEnlaceDto, enlaceGuardado);
  }
}
