import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Brackets, Not, Raw } from 'typeorm';
import { IParroquiaCasoUso } from '../parroquia-caso-uso/IParroquiaCasoUso';
import { ParroquiaModel } from '../parroquia-caso-uso/models/parroquia';
import { Parroquia } from '../entidades/parroquia.entity';
import { ParroquiaRepository } from './parroquia.repository';

@Injectable()
export class ParroquiaRepoService implements IParroquiaCasoUso {
  constructor(private readonly _parroquiaRepository: ParroquiaRepository) {}

  async obtener(): Promise<Parroquia[]> {
    try {
      return await this._parroquiaRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarNombre(nombre: string): Promise<Parroquia> {
    try {
      return await this._parroquiaRepository.findOne({
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
    ParroquiaID: number,
  ): Promise<Parroquia> {
    try {
      return await this._parroquiaRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Nombre: nombre,
          ParroquiaID: Not(ParroquiaID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(ParroquiaID: any): Promise<boolean> {
    try {
      await this._parroquiaRepository.update(ParroquiaID, {
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
      return await this._parroquiaRepository
        .createQueryBuilder('Parroquia')
        .innerJoinAndSelect('Parroquia.Canton', 'Canton')
        .innerJoinAndSelect('Canton.Plan', 'Plan')
        .where('Parroquia.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere(
          new Brackets(qb => {
            qb.where('Canton.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            })
              .orWhere('Parroquia.Nombre ILIKE :Nombre', {
                Nombre: `%${termino}%`,
              })
              .orWhere('Plan.Nombre ILIKE :Nombre', {
                Nombre: `%${termino}%`,
              });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Parroquia.ParroquiaID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._parroquiaRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          ParroquiaID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(ParroquiaID: number): Promise<Parroquia> {
    try {
      const parroquia: Parroquia = await this._parroquiaRepository.findOne(
        ParroquiaID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!parroquia) {
        throw new NotFoundException(
          `el parroquia con id: ${ParroquiaID} no existe`,
        );
      }
      return parroquia;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(
    parroquia: ParroquiaModel,
    ParroquiaID: number,
  ): Promise<boolean> {
    try {
      await this._parroquiaRepository.update(ParroquiaID, parroquia);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(parroquia: ParroquiaModel): Promise<Parroquia> {
    console.log(parroquia);
    try {
      const parroquiaIntance = new Parroquia();
      Object.assign(parroquiaIntance, parroquia);
      return await parroquiaIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
