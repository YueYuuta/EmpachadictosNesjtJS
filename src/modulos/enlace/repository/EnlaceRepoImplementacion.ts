import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Brackets, Not, Raw } from 'typeorm';
import { IEnlaceCasoUso } from '../enlace-caso-uso/IEnlaceCasoUso';
import { EnlaceModel } from '../enlace-caso-uso/models/enlace';
import { Enlace } from '../entidades/enlace.entity';
import { EnlaceRepository } from './enlace.repository';

@Injectable()
export class EnlaceRepoService implements IEnlaceCasoUso {
  constructor(private readonly _enlaceRepository: EnlaceRepository) {}

  async obtener(): Promise<Enlace[]> {
    try {
      return await this._enlaceRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarNombre(descripcion: string): Promise<Enlace> {
    try {
      return await this._enlaceRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Descripcion: descripcion },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async verificarNombreEditar(
    descripcion: string,
    EnlaceID: number,
  ): Promise<Enlace> {
    try {
      return await this._enlaceRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Descripcion: descripcion,
          EnlaceID: Not(EnlaceID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(EnlaceID: any): Promise<boolean> {
    try {
      await this._enlaceRepository.update(EnlaceID, {
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
      return await this._enlaceRepository
        .createQueryBuilder('Enlace')
        .innerJoinAndSelect('Enlace.Plan', 'Plan')
        .where('Enlace.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere(
          new Brackets(qb => {
            qb.where('Plan.Descripcion ILIKE :Descripcion', {
              Descripcion: `%${termino}%`,
            }).orWhere('Enlace.Descripcion ILIKE :Descripcion', {
              Descripcion: `%${termino}%`,
            });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Enlace.EnlaceID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._enlaceRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          EnlaceID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(EnlaceID: number): Promise<Enlace> {
    try {
      const enlace: Enlace = await this._enlaceRepository.findOne(EnlaceID, {
        where: { Estado: EntityStatus.ACTIVE },
      });

      if (!enlace) {
        throw new NotFoundException(`el enlace con id: ${EnlaceID} no existe`);
      }
      return enlace;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(enlace: EnlaceModel, EnlaceID: number): Promise<boolean> {
    try {
      await this._enlaceRepository.update(EnlaceID, enlace);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(enlace: EnlaceModel): Promise<Enlace> {
    try {
      const enlaceIntance = new Enlace();
      Object.assign(enlaceIntance, enlace);
      return await enlaceIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
