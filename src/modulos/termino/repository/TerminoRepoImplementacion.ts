import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Not, Raw } from 'typeorm';
import { Termino } from '../entidades/termino.entity';
import { ITerminoCasoUso } from '../termino-caso-uso/ITerminoCasoUso';
import { TerminoModel } from '../termino-caso-uso/models/termino';
import { TerminoRepository } from './termino.repository';

@Injectable()
export class TerminoRepoService implements ITerminoCasoUso {
  constructor(private readonly _terminoRepository: TerminoRepository) {}

  async obtener(): Promise<Termino[]> {
    try {
      return await this._terminoRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarNombre(descripcion: string): Promise<Termino> {
    try {
      return await this._terminoRepository.findOne({
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
    TerminoID: number,
  ): Promise<Termino> {
    try {
      return await this._terminoRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Descripcion: descripcion,
          TerminoID: Not(TerminoID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(TerminoID: any): Promise<boolean> {
    try {
      await this._terminoRepository.update(TerminoID, {
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
      return await this._terminoRepository.findAndCount({
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
      return await this._terminoRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          TerminoID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(TerminoID: number): Promise<Termino> {
    try {
      const termino: Termino = await this._terminoRepository.findOne(
        TerminoID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!termino) {
        throw new NotFoundException(
          `el termino con id: ${TerminoID} no existe`,
        );
      }
      return termino;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(termino: TerminoModel, TerminoID: number): Promise<boolean> {
    try {
      await this._terminoRepository.update(TerminoID, termino);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(termino: TerminoModel): Promise<Termino> {
    console.log(termino);
    try {
      const terminoIntance = new Termino();
      Object.assign(terminoIntance, termino);
      return await terminoIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
