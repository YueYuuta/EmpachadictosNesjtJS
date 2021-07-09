import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityStatus } from '@utils/enums';
import { Brackets, Not } from 'typeorm';
import { DespacharDetalle } from '../entidates/despachar-detalle.entity';
import { Despachar } from '../entidates/despachar.entity';
import { IDespacharCasoUso } from '../pedido-caso-uso/IDespacharCasoUso';
import { DespacharModel } from '../pedido-caso-uso/models/despachar.model';

import { DespacharDetalleRepository } from './despachar-detalle.repository';
import { DespacharRepository } from './despachar.repository';

@Injectable()
export class DespacharRepoService implements IDespacharCasoUso {
  constructor(
    @InjectRepository(DespacharRepository)
    private readonly _despacharRepository: DespacharRepository,
    @InjectRepository(DespacharDetalleRepository)
    private readonly _despacharDetalleRepository: DespacharDetalleRepository,
  ) {}
  async obtenerPodId(DespacharID: number): Promise<Despachar> {
    return await this._despacharRepository
      .createQueryBuilder('Despachar')
      .innerJoinAndSelect('Despachar.Detalle', 'Detalle')
      .innerJoinAndSelect('Despachar.AlmacenID', 'Alamcen')
      .innerJoinAndSelect('Despachar.MesaID', 'Mesa')
      .innerJoinAndSelect('Detalle.Producto', 'Producto')
      .where('Despachar.DespacharID=:DespacharID', { DespacharID })
      .where('Despachar.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
      .andWhere('Detalle.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
      .getOne();
  }
  async obtenerPodIdTodo(DespcharID: number): Promise<Despachar> {
    try {
      const despachar: Despachar = await this._despacharRepository.findOne(
        DespcharID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!despachar) {
        throw new NotFoundException(
          `el despachar con id: ${DespcharID} no existe`,
        );
      }
      return despachar;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerTodos(AlmacenID: number): Promise<Despachar[]> {
    try {
      const despachar = await this._despacharRepository.find({
        where: {
          Estado: EntityStatus.ACTIVE,
          AlmacenID,
        },
        order: {
          DespacharID: 'ASC',
        },
      });
      return despachar;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerPaginado(
    desde: number,
    limite: number,
    AlmacenID: number,
  ): Promise<any> {
    try {
      return await this._despacharRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE, AlmacenID },
        skip: desde,
        take: limite,
        order: {
          DespacharID: 'DESC',
        },
      });
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
    AlmacenID: number,
  ): Promise<any> {
    try {
      return await this._despacharRepository
        .createQueryBuilder('Despachar')
        .innerJoinAndSelect('Despachar.Detalle', 'Detalle')
        .innerJoinAndSelect('Despachar.AlmacenID', 'Alamcen')
        .innerJoinAndSelect('Despachar.MesaID', 'Mesa')
        .innerJoinAndSelect('Detalle.Producto', 'Producto')
        .where('Despachar.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere('Despachar.AlmacenID=:AlmacenID', { AlmacenID })
        .andWhere(
          new Brackets(qb => {
            qb.where('Mesa.Descripcion ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            });
            // .orWhere('Menu.Descripcion ILIKE :Descripcion', {
            //   Descripcion: `%${termino}%`,
            // })
            // .orWhere('Producto.Descripcion ILIKE :Descripcion', {
            //   Descripcion: `%${termino}%`,
            // });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Despachar.DespacharID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async editar(
    despachar: DespacharModel,
    DespacharID: number,
  ): Promise<boolean> {
    try {
      await this.eliminarDetalle(DespacharID);
      const despacharIntance = await this.obtenerPodId(DespacharID);
      this._despacharRepository.merge(despacharIntance, despachar);
      await despacharIntance.save();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminarDetalle(DespacharID: number): Promise<boolean> {
    try {
      await this._despacharDetalleRepository
        .createQueryBuilder()
        .update()
        .set({ Estado: EntityStatus.INACTIVE })
        .where('DespacharID = :DespacharID', { DespacharID })
        .execute();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(despachar: DespacharModel): Promise<Despachar> {
    try {
      const despacharIntance = new Despachar();
      Object.assign(despacharIntance, despachar);
      return await despacharIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async eliminar(DespacharID: number): Promise<boolean> {
    try {
      await this._despacharRepository.update(DespacharID, {
        Estado: EntityStatus.INACTIVE,
      });
      await this.eliminarDetalle(DespacharID);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async cambiarEstadoDespachar(
    DespacharID: number,
    EstadoDespachar: boolean,
  ): Promise<boolean> {
    try {
      await this._despacharRepository
        .createQueryBuilder()
        .update()
        .set({ EstadoDespachar })
        .where('DespacharID = :DespacharID', { DespacharID })
        .execute();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async cambiarEstadoDespacharDetalle(
    DespacharDetalleID: number,
    EstadoDespachar: boolean,
  ): Promise<boolean> {
    try {
      await this._despacharDetalleRepository
        .createQueryBuilder()
        .update()
        .set({ EstadoDespachar })
        .where('DespacharDetalleID = :DespacharDetalleID', {
          DespacharDetalleID,
        })
        .execute();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async cambiarEstadoDespacharTipoDetalle(
    DespacharDetalleID: number,
    EstadoDespacharTipo: boolean,
  ): Promise<boolean> {
    try {
      await this._despacharDetalleRepository
        .createQueryBuilder()
        .update()
        .set({ EstadoDespacharTipo })
        .where('DespacharDetalleID = :DespacharDetalleID', {
          DespacharDetalleID,
        })
        .execute();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
