import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { ProvinciaModel } from './models/provincia';
import { LeerProvinciaDto } from '../api/dto';
import { IProvinciaCasoUso } from './IProvinciaCasoUso';
import { Provincia } from '../entidades/provincia.entity';

const ProvinciaRepo = () => Inject('ProvinciaRepo');

@Injectable()
export class CrearProvinciaCasoUso {
  constructor(
    @ProvinciaRepo() private readonly _provinciaRepository: IProvinciaCasoUso,
  ) {}

  async crear(provincia: ProvinciaModel): Promise<LeerProvinciaDto> {
    // provincia.Nombre = provincia.Nombre.toUpperCase();
    const nombreProvincia = await this._provinciaRepository.verificarNombre(
      provincia.Nombre,
    );
    if (nombreProvincia) {
      throw new ConflictException(
        `La provincia: ${provincia.Nombre}, ya existe!`,
      );
    }
    const provinciaGuardado: Provincia = await this._provinciaRepository.crear(
      provincia,
    );
    return plainToClass(LeerProvinciaDto, provinciaGuardado);
  }
}
