import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityStatus } from '@utils/enums';
import { Brackets, Not } from 'typeorm';
import { PedidoDetalle } from '../entidates/pedido-detalle.entity';
import { Pedido } from '../entidates/pedido.entity';
import { IPedidoCasoUso } from '../pedido-caso-uso/IPedidoCasoUso';
import { PedidoModel } from '../pedido-caso-uso/models/pedido.model';

import { PedidoDetalleRepository } from './pedido-detalle.repository';
import { PedidoRepository } from './pedido.repository';

@Injectable()
export class PedidoRepoService implements IPedidoCasoUso {
  constructor(
    @InjectRepository(PedidoRepository)
    private readonly _pedidoRepository: PedidoRepository,
    @InjectRepository(PedidoDetalleRepository)
    private readonly _pedidoDetalleRepository: PedidoDetalleRepository,
  ) {}
  async cambiarMesa(MesaID: number, PedidoID: number): Promise<boolean> {
    try {
      await this._pedidoRepository.update(PedidoID, {
        MesaID,
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminarDefinitivamente(PedidoID: number): Promise<boolean> {
    try {
      await this._pedidoRepository.delete(PedidoID);
      await this.eliminarBd(PedidoID);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async verificarDescripcion(descripcion: string): Promise<Pedido> {
    try {
      return await this._pedidoRepository.findOne({
        where: { Estado: EntityStatus.ACTIVE, Descripcion: descripcion },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async verificarDescripcionEditar(
    descripcion: string,
    PedidoID: number,
  ): Promise<Pedido> {
    try {
      return await this._pedidoRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Descripcion: descripcion,
          PedidoID: Not(PedidoID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async cambiarEstado(estado: boolean, PedidoID: number): Promise<void> {
    try {
      await this._pedidoDetalleRepository
        .createQueryBuilder()
        .update(PedidoDetalle)
        .set({ Estado: estado })
        .where('Pedido = :id', { id: PedidoID })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async eliminar(PedidoID: number): Promise<boolean> {
    try {
      await this._pedidoRepository.update(PedidoID, {
        Estado: EntityStatus.INACTIVE,
      });
      await this.cambiarEstado(EntityStatus.INACTIVE, PedidoID);
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
      return await this._pedidoRepository
        .createQueryBuilder('Pedido')
        .innerJoinAndSelect('Pedido.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.Producto', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('Pedido.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere(
          new Brackets(qb => {
            qb.where('Categoria.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            })
              .orWhere('Pedido.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              })
              .orWhere('Producto.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Pedido.PedidoID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._pedidoRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          PedidoID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPorBusquedaYCategoria(
    desde: number,
    limite: number,
    termino: string,
    CategoriaID: number,
  ): Promise<any> {
    try {
      return await this._pedidoRepository
        .createQueryBuilder('Pedido')
        .innerJoinAndSelect('Pedido.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.Producto', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('Pedido.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere('Producto.Categoria=:CategoriaID', { CategoriaID })
        .andWhere(
          new Brackets(qb => {
            qb.where('Categoria.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            })
              .orWhere('Pedido.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              })
              .orWhere('Producto.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Pedido.PedidoID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginadoPorCategoria(
    desde: number,
    limite: number,
    CategoriaID: number,
  ): Promise<any> {
    try {
      return await this._pedidoRepository
        .createQueryBuilder('Pedido')
        .innerJoinAndSelect('Pedido.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.Producto', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('Pedido.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere('Producto.Categoria=:CategoriaID', { CategoriaID })
        .skip(desde)
        .take(limite)
        .orderBy('Pedido.PedidoID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(PedidoID: number): Promise<Pedido> {
    try {
      const pedido: Pedido = await this._pedidoRepository.findOne(PedidoID, {
        where: { Estado: EntityStatus.ACTIVE },
      });

      if (!pedido) {
        throw new NotFoundException(`el pedido con id: ${PedidoID} no existe`);
      }
      return pedido;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminarBd(PedidoID: number): Promise<boolean> {
    try {
      await this._pedidoDetalleRepository
        .createQueryBuilder('PedidoDetalle')
        .delete()
        .where('Pedido=:PedidoID', { PedidoID })
        .execute();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async editar(pedido: PedidoModel, PedidoID: number): Promise<boolean> {
    try {
      await this.eliminarBd(PedidoID);
      const pedidoIntance = await this.obtenerPodId(PedidoID);
      this._pedidoRepository.merge(pedidoIntance, pedido);
      await pedidoIntance.save();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(pedido: PedidoModel): Promise<Pedido> {
    try {
      const pedidoIntance = new Pedido();
      Object.assign(pedidoIntance, pedido);
      return await pedidoIntance.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
