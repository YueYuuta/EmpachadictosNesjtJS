import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityStatus } from '@utils/enums';
import { Brackets } from 'typeorm';
import { IngresoDetalle } from '../entidates/ingreso-detalle.entity';
import { Ingreso } from '../entidates/ingreso.entity';
import { IIngresoCasoUso } from '../ingreso-caso-uso/IIngresoCasoUso';
import { IngresoDetalleModel } from '../ingreso-caso-uso/models/ingreso-detalle.model';
import { IngresoModel } from '../ingreso-caso-uso/models/ingreso.model';

import { IngresoDetalleRepository } from './ingreso-detalle.repository';
import { IngresoRepository } from './ingreso.repository';

@Injectable()
export class IngresoRepoService implements IIngresoCasoUso {
  constructor(
    @InjectRepository(IngresoRepository)
    private readonly _ingresoRepository: IngresoRepository,
    @InjectRepository(IngresoDetalleRepository)
    private readonly _ingresoDetalleRepository: IngresoDetalleRepository,
  ) {}
  async obtenerDetallePorIngresoID(
    IngresoID: number,
  ): Promise<IngresoDetalle[]> {
    try {
      return await this._ingresoDetalleRepository.find({
        where: { Estado: EntityStatus.ACTIVE, IngresoID },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerDetallePorID(IngresoDetalleID: number): Promise<IngresoDetalle> {
    try {
      const ingresoDetalle = await this._ingresoDetalleRepository.findOne(
        IngresoDetalleID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!ingresoDetalle) {
        throw new NotFoundException(
          `el detalle del ingreso con id: ${IngresoDetalleID} no existe`,
        );
      }
      return ingresoDetalle;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async editarDetalle(ingresoDetalle: IngresoDetalleModel): Promise<boolean> {
    try {
      console.log('ingreso este detalle', ingresoDetalle);
      const ingresoDetalleIntance = await this.obtenerDetallePorID(
        ingresoDetalle.IngresoDetalleID,
      );
      this._ingresoDetalleRepository.merge(
        ingresoDetalleIntance,
        ingresoDetalle,
      );
      await ingresoDetalleIntance.save();
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async eliminarDetalle(IngresoDetalleID: number): Promise<boolean> {
    try {
      await this._ingresoDetalleRepository.update(IngresoDetalleID, {
        Estado: EntityStatus.INACTIVE,
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async eliminarDetalleTodo(IngresoID: number): Promise<boolean> {
    try {
      await this._ingresoDetalleRepository
        .createQueryBuilder()
        .update(IngresoDetalle)
        .set({ Estado: EntityStatus.INACTIVE })
        .where('IngresoID = :id', { id: IngresoID })
        .execute();
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
  async eliminarDetalleDefinitivo(IngresiDetalleID: number): Promise<boolean> {
    try {
      await this._ingresoDetalleRepository.delete(IngresiDetalleID);
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
  async crearDetalle(
    ingresoDetalle: IngresoDetalleModel,
  ): Promise<IngresoDetalle> {
    try {
      const ingresoDetalleIntance = new IngresoDetalle();
      Object.assign(ingresoDetalleIntance, ingresoDetalle);
      return await ingresoDetalleIntance.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async cambiarEstado(estado: boolean, IngresoID: number): Promise<void> {
    try {
      await this._ingresoDetalleRepository
        .createQueryBuilder()
        .update(IngresoDetalle)
        .set({ Estado: estado })
        .where('Ingreso = :id', { id: IngresoID })
        .execute();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async eliminar(IngresoID: number): Promise<boolean> {
    try {
      await this._ingresoRepository.update(IngresoID, {
        Estado: EntityStatus.INACTIVE,
      });
      await this.cambiarEstado(EntityStatus.INACTIVE, IngresoID);
      return true;
    } catch (error) {
      console.log(error);
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
      return await this._ingresoRepository
        .createQueryBuilder('Ingreso')
        .innerJoinAndSelect('Ingreso.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.Producto', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('Ingreso.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere(
          new Brackets(qb => {
            qb.where('Categoria.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            })
              .orWhere('Ingreso.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              })
              .orWhere('Producto.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Ingreso.IngresoID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._ingresoRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          IngresoID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPorId(IngresoID: number): Promise<Ingreso> {
    try {
      const ingreso = await this._ingresoRepository.findOne(IngresoID, {
        where: { Estado: EntityStatus.ACTIVE },
      });

      if (!ingreso) {
        throw new NotFoundException(
          `el ingreso con id: ${IngresoID} no existe`,
        );
      }
      return ingreso;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(ingreso: any, IngresoID: number): Promise<boolean> {
    try {
      const ingresoIntance = await this.obtenerPorId(IngresoID);
      this._ingresoRepository.merge(ingresoIntance, ingreso);
      await ingresoIntance.save();
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(ingreso: IngresoModel): Promise<Ingreso> {
    try {
      const ingresoIntance = new Ingreso();
      Object.assign(ingresoIntance, ingreso);
      return await ingresoIntance.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
