import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { IProveedorCasoUso } from './IProveedorCasoUso';
import { ProveedorModel } from './models/proveedor';
import { LeerProveedorDto } from '../api/dto/leer-proveedor.dto';
import { Proveedor } from '../entidates/proveedor.entity';
import { plainToClass } from 'class-transformer';
import { ValidarIdentificacion } from '@utils/validaciones/entidad-documento';

const ProveedorRepo = () => Inject('ProveedorRepo');

@Injectable()
export class CrearProveedorCasoUso {
  constructor(
    @ProveedorRepo() private readonly _proveedorRepository: IProveedorCasoUso,
  ) {}

  async crear(proveedor: Partial<ProveedorModel>): Promise<LeerProveedorDto> {
    await this.validacionesCrear(proveedor);
    const proveedorGuardado: Proveedor = await this._proveedorRepository.crear(
      proveedor,
    );
    return plainToClass(LeerProveedorDto, proveedorGuardado);
  }

  async validacionesCrear(proveedor: Partial<ProveedorModel>): Promise<void> {
    const { Ruc } = proveedor;

    const proveedorRuc = await this._proveedorRepository.verificarRuc(Ruc);
    if (proveedorRuc) {
      throw new ConflictException(
        `El ruc: ${Ruc} ya esta en uso por otro proveedor!`,
      );
    }
    const validacion = new ValidarIdentificacion();
    if (!validacion.validarRucPersonaNatural(Ruc)) {
      throw new ConflictException(`el ruc: ${Ruc} no es un ruc valida!`);
    }
  }
}
