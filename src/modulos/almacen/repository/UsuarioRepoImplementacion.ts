import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IAlmacenCasoUso } from '../almacen-caso-uso/IAlmacenCasoUso';
import { AlmacenRepository } from './almacen.repository';
import { Raw } from 'typeorm';
import { Almacen } from '../entidates/almacen.entity';
import { EntityStatus } from '@utils/enums';
import { EditarAlmacenDto } from '../api/dto/editar-almacen.dto';
import { CrearAlmacenDto } from '../api/dto/crear-almacen.dto';

@Injectable()
export class AlmacenRepoService implements IAlmacenCasoUso {
  constructor(private readonly _almacenRepository: AlmacenRepository) {}
  async eliminar(AlmacenID: any): Promise<boolean> {
    try {
      await this._almacenRepository.update(AlmacenID, {
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
      return await this._almacenRepository.findAndCount({
        where: [
          {
            Estado: EntityStatus.ACTIVE,
            NombreComercial: Raw(alias => `${alias} ILIKE '%${termino}%'`),
          },
          {
            Estado: EntityStatus.ACTIVE,
            RazonSocial: Raw(alias => `${alias} ILIKE '%${termino}%'`),
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
  async obtener(): Promise<Almacen[]> {
    try {
      return await this._almacenRepository.find({
        where: { Estado: EntityStatus.ACTIVE },
        order: {
          AlmacenID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._almacenRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          AlmacenID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(AlmacenID: number): Promise<Almacen> {
    try {
      const almacen: Almacen = await this._almacenRepository.findOne(
        AlmacenID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!almacen) {
        throw new NotFoundException(
          `el almacen con id: ${AlmacenID} no existe`,
        );
      }
      return almacen;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(
    almacen: Partial<EditarAlmacenDto>,
    AlmacenID: number,
  ): Promise<any> {
    try {
      return await this._almacenRepository.update(AlmacenID, almacen);
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(almacen: CrearAlmacenDto): Promise<Almacen> {
    try {
      const almacenIntance = new Almacen();
      Object.assign(almacenIntance, almacen);
      return await almacenIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
