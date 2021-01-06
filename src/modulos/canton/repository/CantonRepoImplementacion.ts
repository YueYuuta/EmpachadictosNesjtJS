import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Brackets, Not, Raw } from 'typeorm';
import { ICantonCasoUso } from '../canton-caso-uso/ICantonCasoUso';
import { CantonModel } from '../canton-caso-uso/models/canton';
import { Canton } from '../entidades/canton.entity';
import { CantonRepository } from './canton.repository';

@Injectable()
export class CantonRepoService implements ICantonCasoUso {
  constructor(private readonly _cantonRepository: CantonRepository) {}

  async obtener(): Promise<Canton[]> {
    try {
      return await this._cantonRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarNombre(nombre: string): Promise<Canton> {
    try {
      return await this._cantonRepository.findOne({
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
    CantonID: number,
  ): Promise<Canton> {
    try {
      return await this._cantonRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Nombre: nombre,
          CantonID: Not(CantonID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(CantonID: any): Promise<boolean> {
    try {
      await this._cantonRepository.update(CantonID, {
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
      return await this._cantonRepository
        .createQueryBuilder('Canton')
        .innerJoinAndSelect('Canton.Provincia', 'Provincia')
        .where('Canton.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere(
          new Brackets(qb => {
            qb.where('Provincia.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            }).orWhere('Canton.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Canton.CantonID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._cantonRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          CantonID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(CantonID: number): Promise<Canton> {
    try {
      const canton: Canton = await this._cantonRepository.findOne(CantonID, {
        where: { Estado: EntityStatus.ACTIVE },
      });

      if (!canton) {
        throw new NotFoundException(`el canton con id: ${CantonID} no existe`);
      }
      return canton;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(canton: CantonModel, CantonID: number): Promise<boolean> {
    try {
      await this._cantonRepository.update(CantonID, canton);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(canton: CantonModel): Promise<Canton> {
    console.log(canton);
    try {
      const cantonIntance = new Canton();
      Object.assign(cantonIntance, canton);
      return await cantonIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
