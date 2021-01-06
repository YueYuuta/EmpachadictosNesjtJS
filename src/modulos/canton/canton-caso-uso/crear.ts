import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { plainToClass } from 'class-transformer';

import { CantonModel } from './models/canton';
import { LeerCantonDto } from '../api/dto';
import { ICantonCasoUso } from './ICantonCasoUso';
import { Canton } from '../entidades/canton.entity';
import { LeerProvinciaCasoUso } from '@modulos/provincia/provincia-caso-uso/leer';

const CantonRepo = () => Inject('CantonRepo');

@Injectable()
export class CrearCantonCasoUso {
  constructor(
    @CantonRepo() private readonly _cantonRepository: ICantonCasoUso,
    private readonly provinciaService: LeerProvinciaCasoUso,
  ) {}

  async crear(canton: CantonModel): Promise<LeerCantonDto> {
    await this.provinciaService.obtenerProId(canton.Provincia);
    // canton.Nombre = canton.Nombre.toUpperCase();
    const nombreCanton = await this._cantonRepository.verificarNombre(
      canton.Nombre,
    );
    if (nombreCanton) {
      throw new ConflictException(`La canton: ${canton.Nombre}, ya existe!`);
    }
    const cantonGuardado: Canton = await this._cantonRepository.crear(canton);
    return plainToClass(LeerCantonDto, cantonGuardado);
  }
}
