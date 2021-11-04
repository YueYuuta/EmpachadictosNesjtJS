import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IProveedorCasoUso } from './IProveedorCasoUso';
import { ProveedorModel } from './models/proveedor';
import { ValidarIdentificacion } from '@utils/validaciones/entidad-documento';

const ProveedorRepo = () => Inject('ProveedorRepo');

@Injectable()
export class EditarProveedorCasoUso {
  constructor(
    @ProveedorRepo() private readonly _proveedorRepository: IProveedorCasoUso, // private readonly _enlaceService: LeerEnlaceCasoUso, // private readonly _parroquiaService: LeerParroquiaCasoUso, // private readonly _terminoService: LeerTerminoCasoUso, // private readonly _publicidadService: LeerPublicidadCasoUso,
  ) // private readonly _antiguoService: LeerAntiguoCasoUso,
  {}

  async editar(
    proveedor: Partial<ProveedorModel>,
    ProveedorID: number,
  ): Promise<boolean> {
    // await this.validacionesLLavesForaneas(proveedor);
    await this.validacionesCrear(proveedor, ProveedorID);
    await this._proveedorRepository.obtenerPodId(ProveedorID);
    const proveedorEditado: boolean = await this._proveedorRepository.editar(
      proveedor,
      ProveedorID,
    );
    return proveedorEditado;
  }

  async validacionesCrear(
    proveedor: Partial<ProveedorModel>,
    ProveedorID: number,
  ): Promise<void> {
    const { Ruc } = proveedor;

    const proveedorRuc = await this._proveedorRepository.verificarRucEditar(
      Ruc,
      ProveedorID,
    );
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
