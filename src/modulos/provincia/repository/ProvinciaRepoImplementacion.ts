import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Not, Raw } from 'typeorm';
import { IProvinciaCasoUso } from '../provincia-caso-uso/IProvinciaCasoUso';
import { ProvinciaModel } from '../provincia-caso-uso/models/provincia';
import { Provincia } from '../entidades/provincia.entity';
import { ProvinciaRepository } from './provincia.repository';

@Injectable()
export class ProvinciaRepoService implements IProvinciaCasoUso {
  constructor(private readonly _provinciaRepository: ProvinciaRepository) {}

  async obtener(): Promise<Provincia[]> {
    try {
      return await this._provinciaRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarNombre(nombre: string): Promise<Provincia> {
    try {
      return await this._provinciaRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Nombre: nombre },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async verificarNombreEditar(
    nombre: string,
    ProvinciaID: number,
  ): Promise<Provincia> {
    try {
      return await this._provinciaRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Nombre: nombre,
          ProvinciaID: Not(ProvinciaID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(ProvinciaID: any): Promise<boolean> {
    try {
      await this._provinciaRepository.update(ProvinciaID, {
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
      return await this._provinciaRepository.findAndCount({
        where: [
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
      return await this._provinciaRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          ProvinciaID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(ProvinciaID: number): Promise<Provincia> {
    try {
      const provincia: Provincia = await this._provinciaRepository.findOne(
        ProvinciaID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!provincia) {
        throw new NotFoundException(
          `el provincia con id: ${ProvinciaID} no existe`,
        );
      }
      return provincia;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(
    provincia: ProvinciaModel,
    ProvinciaID: number,
  ): Promise<boolean> {
    try {
      await this._provinciaRepository.update(ProvinciaID, provincia);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(provincia: ProvinciaModel): Promise<Provincia> {
    console.log(provincia);
    try {
      const provinciaIntance = new Provincia();
      Object.assign(provinciaIntance, provincia);
      return await provinciaIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
