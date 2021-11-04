import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Not, Raw } from 'typeorm';
import { IProveedorCasoUso } from '../proveedor-caso-uso/IProveedorCasoUso';
import { ProveedorRepository } from './proveedor.repository';
import { Proveedor } from '../entidates/proveedor.entity';
import { ProveedorModel } from '../proveedor-caso-uso/models/proveedor';

@Injectable()
export class ProveedorRepoService implements IProveedorCasoUso {
  constructor(private readonly _proveedorRepository: ProveedorRepository) {}
  async verificarRuc(ruc: string): Promise<Proveedor> {
    try {
      return await this._proveedorRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Ruc: ruc },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async verificarRucEditar(
    ruc: string,
    ProveedorID: number,
  ): Promise<Proveedor> {
    try {
      return await this._proveedorRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Ruc: ruc,
          ProveedorID: Not(ProveedorID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(ProveedorID: any): Promise<boolean> {
    try {
      await this._proveedorRepository.update(ProveedorID, {
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
      return await this._proveedorRepository.findAndCount({
        where: [
          {
            Estado: EntityStatus.ACTIVE,
            Ruc: Raw(alias => `${alias} ILIKE '%${termino}%'`),
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
      return await this._proveedorRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          ProveedorID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(ProveedorID: number): Promise<Proveedor> {
    try {
      const proveedor: Proveedor = await this._proveedorRepository.findOne(
        ProveedorID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!proveedor) {
        throw new NotFoundException(
          `el proveedor con id: ${ProveedorID} no existe`,
        );
      }
      return proveedor;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  async editar(
    proveedor: Partial<ProveedorModel>,
    ProveedorID: number,
  ): Promise<boolean> {
    try {
      await this._proveedorRepository.update(ProveedorID, proveedor);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(proveedor: ProveedorModel): Promise<Proveedor> {
    try {
      const proveedorIntance = new Proveedor();
      Object.assign(proveedorIntance, proveedor);
      return await proveedorIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
