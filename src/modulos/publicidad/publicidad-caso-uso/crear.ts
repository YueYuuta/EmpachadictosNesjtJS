import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { PublicidadModel } from './models/publicidad';
import { LeerPublicidadDto } from '../api/dto';
import { IPublicidadCasoUso } from './IPublicidadCasoUso';
import { Publicidad } from '../entidades/publicidad.entity';

const PublicidadRepo = () => Inject('PublicidadRepo');

@Injectable()
export class CrearPublicidadCasoUso {
  constructor(
    @PublicidadRepo()
    private readonly _publicidadRepository: IPublicidadCasoUso,
  ) {}

  async crear(publicidad: PublicidadModel): Promise<LeerPublicidadDto> {
    publicidad.Descripcion = publicidad.Descripcion.toUpperCase();
    const nombrePublicidad = await this._publicidadRepository.verificarNombre(
      publicidad.Descripcion,
    );
    if (nombrePublicidad) {
      throw new ConflictException(
        `La publicidad: ${publicidad.Descripcion}, ya existe!`,
      );
    }
    const publicidadGuardado: Publicidad = await this._publicidadRepository.crear(
      publicidad,
    );
    return plainToClass(LeerPublicidadDto, publicidadGuardado);
  }
}
