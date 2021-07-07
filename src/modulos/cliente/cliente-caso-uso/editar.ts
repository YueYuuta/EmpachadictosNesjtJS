import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IClienteCasoUso } from './IClienteCasoUso';
import { ClienteModel } from './models/cliente';
import { ValidarIdentificacion } from '@utils/validaciones/entidad-documento';

const ClienteRepo = () => Inject('ClienteRepo');

@Injectable()
export class EditarClienteCasoUso {
  constructor(
    @ClienteRepo() private readonly _clienteRepository: IClienteCasoUso, // private readonly _enlaceService: LeerEnlaceCasoUso,
  ) // private readonly _parroquiaService: LeerParroquiaCasoUso,
  // private readonly _terminoService: LeerTerminoCasoUso,
  // private readonly _publicidadService: LeerPublicidadCasoUso,
  // private readonly _antiguoService: LeerAntiguoCasoUso,
  {}

  async editar(
    cliente: Partial<ClienteModel>,
    ClienteID: number,
  ): Promise<boolean> {
    // await this.validacionesLLavesForaneas(cliente);
    await this.validacionesCrear(cliente, ClienteID);
    await this._clienteRepository.obtenerPodId(ClienteID);
    const clienteEditado: boolean = await this._clienteRepository.editar(
      cliente,
      ClienteID,
    );
    return clienteEditado;
  }

  async validacionesCrear(
    cliente: Partial<ClienteModel>,
    ClienteID: number,
  ): Promise<void> {
    const { Cedula, Ruc, Otro } = cliente;
    if (!Cedula && !Ruc && !Otro) {
      throw new ConflictException(
        `Debe Ingresar al menos un tipo de identificacion del cliente!`,
      );
    }

    //validar si la cedula es valida
    if (Cedula) {
      const clienteCedula = await this._clienteRepository.verificarCedulaEditar(
        Cedula,
        ClienteID,
      );
      if (clienteCedula) {
        throw new ConflictException(
          `La Cedula: ${Cedula} ya esta en uso por otro cliente!`,
        );
      }
      const validacion = new ValidarIdentificacion();
      if (!validacion.validarCedula(Cedula)) {
        throw new ConflictException(
          `La Cedula: ${Cedula} no es una cedula valida!`,
        );
      }
    }
    //validar si el ruc es valido
    if (Ruc) {
      const clienteRuc = await this._clienteRepository.verificarRucEditar(
        Ruc,
        ClienteID,
      );
      if (clienteRuc) {
        throw new ConflictException(
          `El ruc: ${Ruc} ya esta en uso por otro cliente!`,
        );
      }
      const validacion = new ValidarIdentificacion();
      if (!validacion.validarRucPersonaNatural(Ruc)) {
        throw new ConflictException(`el ruc: ${Ruc} no es un ruc valida!`);
      }
    }

    if (Otro) {
      const clienteOtro = await this._clienteRepository.verificarOtroEditar(
        Otro,
        ClienteID,
      );
      if (clienteOtro) {
        throw new ConflictException(
          `El documento de identificacion: ${Otro} ya esta en uso por otro cliente!`,
        );
      }
    }
  }

  // async validacionesLLavesForaneas(
  //   cliente: Partial<ClienteModel>,
  // ): Promise<void> {
  //   await this._enlaceService.obtenerProId(cliente.Enlace);
  //   await this._parroquiaService.obtenerProId(cliente.Parroquia);
  //   await this._terminoService.obtenerProId(cliente.Termino);
  //   if (cliente.Publicidad) {
  //     await this._publicidadService.obtenerProId(cliente.Publicidad);
  //   }
  //   if (cliente.Antiguo) {
  //     await this._antiguoService.obtenerProId(cliente.Antiguo);
  //   }
  // }
}
