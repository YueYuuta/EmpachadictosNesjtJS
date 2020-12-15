import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Not, Raw } from 'typeorm';
import { IClienteCasoUso } from '../cliente-caso-uso/IClienteCasoUso';
import { ClienteRepository } from './cliente.repository';
import { Cliente } from '../entidates/producto.entity';
import { ClienteModel } from '../cliente-caso-uso/models/cliente';

@Injectable()
export class ClienteRepoService implements IClienteCasoUso {
  constructor(private readonly _clienteRepository: ClienteRepository) {}
  async verificarRuc(ruc: string): Promise<Cliente> {
    try {
      return await this._clienteRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Ruc: ruc },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarCedula(cedula: string): Promise<Cliente> {
    try {
      return await this._clienteRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Cedula: cedula },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarOtro(otro: string): Promise<Cliente> {
    try {
      return await this._clienteRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Otro: otro },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarRucEditar(ruc: string, ClienteID: number): Promise<Cliente> {
    try {
      return await this._clienteRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Ruc: ruc,
          ClienteID: Not(ClienteID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarCedulaEditar(
    cedula: string,
    ClienteID: number,
  ): Promise<Cliente> {
    try {
      return await this._clienteRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Cedula: cedula,
          ClienteID: Not(ClienteID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarOtroEditar(otro: string, ClienteID: number): Promise<Cliente> {
    try {
      return await this._clienteRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Otro: otro,
          ClienteID: Not(ClienteID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async eliminar(ClienteID: any): Promise<boolean> {
    try {
      await this._clienteRepository.update(ClienteID, {
        Estado: EntityStatus.INACTIVE,
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any> {
    try {
      return await this._clienteRepository.findAndCount({
        where: [
          {
            Estado: EntityStatus.ACTIVE,
            Cedula: Raw(alias => `${alias} ILIKE '%${termino}%'`),
          },
          {
            Estado: EntityStatus.ACTIVE,
            Ruc: Raw(alias => `${alias} ILIKE '%${termino}%'`),
          },
          {
            Estado: EntityStatus.ACTIVE,
            Otro: Raw(alias => `${alias} ILIKE '%${termino}%'`),
          },
          {
            Estado: EntityStatus.ACTIVE,
            Nombre: Raw(alias => `${alias} ILIKE '%${termino}%'`),
          },
        ],
        skip: desde,
        take: limite,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._clienteRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          ClienteID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(ClienteID: number): Promise<Cliente> {
    try {
      const cliente: Cliente = await this._clienteRepository.findOne(
        ClienteID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!cliente) {
        throw new NotFoundException(
          `el cliente con id: ${ClienteID} no existe`,
        );
      }
      return cliente;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(
    cliente: Partial<ClienteModel>,
    ClienteID: number,
  ): Promise<boolean> {
    try {
      await this._clienteRepository.update(ClienteID, cliente);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(cliente: ClienteModel): Promise<Cliente> {
    try {
      const clienteIntance = new Cliente();
      Object.assign(clienteIntance, cliente);
      return await clienteIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
