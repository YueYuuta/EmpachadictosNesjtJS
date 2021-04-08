import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { IClienteCasoUso } from './IClienteCasoUso';
import { ClienteModel } from './models/cliente';
import { LeerClienteDto } from '../api/dto/leer-cliente.dto';
import { Cliente } from '../entidates/cliente.entity';
import { plainToClass } from 'class-transformer';
import { ValidarIdentificacion } from '@utils/validaciones/entidad-documento';
import { LeerEnlaceCasoUso } from '../../enlace/enlace-caso-uso/leer';
import { LeerParroquiaCasoUso } from '@modulos/parroquia/parroquia-caso-uso/leer';
import { LeerTerminoCasoUso } from '@modulos/termino/termino-caso-uso/leer';
import { LeerPublicidadCasoUso } from '@modulos/publicidad/publicidad-caso-uso/leer';
import { LeerAntiguoCasoUso } from '@modulos/antiguo/antiguo-caso-uso/leer';

const ClienteRepo = () => Inject('ClienteRepo');

@Injectable()
export class CrearClienteCasoUso {
  constructor(
    @ClienteRepo() private readonly _clienteRepository: IClienteCasoUso,
    private readonly _enlaceService: LeerEnlaceCasoUso,
    private readonly _parroquiaService: LeerParroquiaCasoUso,
    private readonly _terminoService: LeerTerminoCasoUso,
    private readonly _publicidadService: LeerPublicidadCasoUso,
    private readonly _antiguoService: LeerAntiguoCasoUso,
  ) {}

  async crear(cliente: Partial<ClienteModel>): Promise<LeerClienteDto> {
    await this.validacionesLLavesForaneas(cliente);
    await this.validacionesCrear(cliente);
    const clienteGuardado: Cliente = await this._clienteRepository.crear(
      cliente,
    );
    return plainToClass(LeerClienteDto, clienteGuardado);
  }

  async validacionesCrear(cliente: Partial<ClienteModel>): Promise<void> {
    const { Cedula, Ruc, Otro } = cliente;
    if (!Cedula && !Ruc && !Otro) {
      throw new ConflictException(
        `Debe Ingresar al menos un tipo de identificacion del cliente!`,
      );
    }

    //validar si la cedula es valida
    if (Cedula) {
      const clienteCedula = await this._clienteRepository.verificarCedula(
        Cedula,
      );
      if (clienteCedula) {
        throw new ConflictException(
          `La Cedula: ${Cedula} ya esta en uso por otro cliente!`,
        );
      }
      const validacion = new ValidarIdentificacion();
      if (!validacion.validarCedula(Cedula)) {
        // console.log('error', validacion.getError());
        throw new ConflictException(
          `La Cedula: ${Cedula} no es una cedula valida!`,
        );
      }
    }
    //validar si el ruc es valido
    if (Ruc) {
      const clienteRuc = await this._clienteRepository.verificarRuc(Ruc);
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
      const clienteOtro = await this._clienteRepository.verificarOtro(Otro);
      if (clienteOtro) {
        throw new ConflictException(
          `El documento de identificacion: ${Otro} ya esta en uso por otro cliente!`,
        );
      }
    }
  }

  async validacionesLLavesForaneas(
    cliente: Partial<ClienteModel>,
  ): Promise<void> {
    await this._enlaceService.obtenerProId(cliente.Enlace);
    await this._parroquiaService.obtenerProId(cliente.Parroquia);
    await this._terminoService.obtenerProId(cliente.Termino);
    if (cliente.Publicidad) {
      await this._publicidadService.obtenerProId(cliente.Publicidad);
    }
    if (cliente.Antiguo) {
      await this._antiguoService.obtenerProId(cliente.Antiguo);
    }
  }
}
