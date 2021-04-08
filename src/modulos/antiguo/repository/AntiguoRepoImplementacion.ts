import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Not, Raw } from 'typeorm';

import { Antiguo } from '../entidades/antiguo.entity';
import { IAntiguoCasoUso } from '../antiguo-caso-uso/IAntiguoCasoUso';
import { AntiguoModel } from '../antiguo-caso-uso/models/antiguo';
import { AntiguoRepository } from './antiguo.repository';

@Injectable()
export class AntiguoRepoService implements IAntiguoCasoUso {
  constructor(private readonly _publicidadRepository: AntiguoRepository) {}

  async obtener(): Promise<Antiguo[]> {
    try {
      return await this._publicidadRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarNombre(descripcion: string): Promise<Antiguo> {
    try {
      return await this._publicidadRepository.findOne({
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
    AntiguoID: number,
  ): Promise<Antiguo> {
    try {
      return await this._publicidadRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Descripcion: descripcion,
          AntiguoID: Not(AntiguoID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(AntiguoID: any): Promise<boolean> {
    try {
      await this._publicidadRepository.update(AntiguoID, {
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
      return await this._publicidadRepository.findAndCount({
        where: [
          {
            Estado: EntityStatus.ACTIVE,
            Descripcion: Raw(alias => `${alias} ILIKE '%${termino}%'`),
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
      return await this._publicidadRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          AntiguoID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(AntiguoID: number): Promise<Antiguo> {
    try {
      const publicidad: Antiguo = await this._publicidadRepository.findOne(
        AntiguoID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!publicidad) {
        throw new NotFoundException(
          `el publicidad con id: ${AntiguoID} no existe`,
        );
      }
      return publicidad;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(publicidad: AntiguoModel, AntiguoID: number): Promise<boolean> {
    try {
      await this._publicidadRepository.update(AntiguoID, publicidad);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(publicidad: AntiguoModel): Promise<Antiguo> {
    try {
      const publicidadIntance = new Antiguo();
      Object.assign(publicidadIntance, publicidad);
      return await publicidadIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
