import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { Brackets, Not, Raw } from 'typeorm';
import { IProductoCasoUso } from '../producto-caso-uso/IProductoCasoUso';
import { Producto } from '../entidates/producto.entity';
import { ProductoRepository } from './producto.repository';
import { ProductoModel } from '../producto-caso-uso/models/producto';

@Injectable()
export class ProductoRepoService implements IProductoCasoUso {
  constructor(private readonly _productoRepository: ProductoRepository) {}
  async verificarDescripcion(descripcion: string): Promise<Producto> {
    try {
      return await this._productoRepository.findOne({
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
    ProductoID: number,
  ): Promise<Producto> {
    try {
      return await this._productoRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Descripcion: descripcion,
          ProductoID: Not(ProductoID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(ProductoID: number): Promise<boolean> {
    try {
      await this._productoRepository.update(ProductoID, {
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
      return await this._productoRepository
        .createQueryBuilder('Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('Producto.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere(
          new Brackets(qb => {
            qb.where('Categoria.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            }).orWhere('Producto.Descripcion ILIKE :Descripcion', {
              Descripcion: `%${termino}%`,
            });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Producto.ProductoID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._productoRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          ProductoID: 'DESC',
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
      return await this._productoRepository
        .createQueryBuilder('Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('Producto.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere('Producto.Categoria=:CategoriaID', { CategoriaID })
        .andWhere(
          new Brackets(qb => {
            qb.where('Categoria.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            }).orWhere('Producto.Descripcion ILIKE :Descripcion', {
              Descripcion: `%${termino}%`,
            });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Producto.ProductoID', 'DESC')
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
      return await this._productoRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE, Categoria: CategoriaID },
        skip: desde,
        take: limite,
        order: {
          ProductoID: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(ProductoID: number): Promise<Producto> {
    try {
      const cliente: Producto = await this._productoRepository.findOne(
        ProductoID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!cliente) {
        throw new NotFoundException(
          `el cliente con id: ${ProductoID} no existe`,
        );
      }
      return cliente;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async editar(
    producto: Partial<ProductoModel>,
    ProductoID: number,
  ): Promise<boolean> {
    try {
      await this._productoRepository.update(ProductoID, producto);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(producto: ProductoModel): Promise<Producto> {
    try {
      const productoIntance = new Producto();
      Object.assign(productoIntance, producto);
      return await productoIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
