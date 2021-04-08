import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Not, Raw } from 'typeorm';

import { Publicidad } from '../entidades/publicidad.entity';
import { IPublicidadCasoUso } from '../publicidad-caso-uso/IPublicidadCasoUso';
import { PublicidadModel } from '../publicidad-caso-uso/models/publicidad';
import { PublicidadRepository } from './publicidad.repository';

@Injectable()
export class PublicidadRepoService implements IPublicidadCasoUso {
  constructor(private readonly _publicidadRepository: PublicidadRepository) {}

  async obtener(): Promise<Publicidad[]> {
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
  async verificarNombre(descripcion: string): Promise<Publicidad> {
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
    PublicidadID: number,
  ): Promise<Publicidad> {
    try {
      return await this._publicidadRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Descripcion: descripcion,
          PublicidadID: Not(PublicidadID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(PublicidadID: any): Promise<boolean> {
    try {
      await this._publicidadRepository.update(PublicidadID, {
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
          PublicidadID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(PublicidadID: number): Promise<Publicidad> {
    try {
      const publicidad: Publicidad = await this._publicidadRepository.findOne(
        PublicidadID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!publicidad) {
        throw new NotFoundException(
          `el publicidad con id: ${PublicidadID} no existe`,
        );
      }
      return publicidad;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(
    publicidad: PublicidadModel,
    PublicidadID: number,
  ): Promise<boolean> {
    try {
      await this._publicidadRepository.update(PublicidadID, publicidad);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(publicidad: PublicidadModel): Promise<Publicidad> {
    try {
      const publicidadIntance = new Publicidad();
      Object.assign(publicidadIntance, publicidad);
      return await publicidadIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
