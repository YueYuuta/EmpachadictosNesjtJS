import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { ParroquiaModel } from './models/parroquia';
import { LeerParroquiaDto } from '../api/dto';
import { IParroquiaCasoUso } from './IParroquiaCasoUso';
import { Parroquia } from '../entidades/parroquia.entity';
import { LeerCantonCasoUso } from '@modulos/canton/canton-caso-uso/leer';

const ParroquiaRepo = () => Inject('ParroquiaRepo');

@Injectable()
export class CrearParroquiaCasoUso {
  constructor(
    @ParroquiaRepo() private readonly _parroquiaRepository: IParroquiaCasoUso,
    private readonly cantonService: LeerCantonCasoUso,
  ) {}

  async crear(parroquia: ParroquiaModel): Promise<LeerParroquiaDto> {
    await this.cantonService.obtenerProId(parroquia.Canton);
    // parroquia.Nombre = parroquia.Nombre.toUpperCase();
    const nombreParroquia = await this._parroquiaRepository.verificarNombre(
      parroquia.Nombre,
    );
    if (nombreParroquia) {
      throw new ConflictException(
        `La parroquia: ${parroquia.Nombre}, ya existe!`,
      );
    }
    const parroquiaGuardado: Parroquia = await this._parroquiaRepository.crear(
      parroquia,
    );
    return plainToClass(LeerParroquiaDto, parroquiaGuardado);
  }
}
