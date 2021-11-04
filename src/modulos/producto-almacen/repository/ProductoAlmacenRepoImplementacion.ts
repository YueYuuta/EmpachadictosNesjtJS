import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityStatus } from '@utils/enums';
import { Brackets } from 'typeorm';
import { ProductoAlmacenDetalle } from '../entidates/producto-almacen-detalle.entity';
import { ProductoAlmacen } from '../entidates/producto-almacen.entity';
import { IProductoAlmacenCasoUso } from '../producto-almacen-caso-uso/IProductoAlmacenCasoUso';
import {
  CrearProductoAlmacenIngresoDetalleModel,
  CrearProductoAlmacenIngresoModel,
} from '../producto-almacen-caso-uso/models/producto-almacen';
import { ProductoAlmacenDetalleRepository } from './producto-almacen-detalle.repository';
import { ProductoAlmacenRepository } from './producto-almacen.repository';

@Injectable()
export class ProductoAlmacenRepoService implements IProductoAlmacenCasoUso {
  constructor(
    @InjectRepository(ProductoAlmacenRepository)
    private readonly _productoAlmacenRepository: ProductoAlmacenRepository,

    @InjectRepository(ProductoAlmacenDetalleRepository)
    private readonly _productoAlmacenDetalleRepository: ProductoAlmacenDetalleRepository,
  ) {}

  async obtenerDetallePorIngresoDetalleID(
    IngresoDetalleID: number,
  ): Promise<ProductoAlmacenDetalle> {
    try {
      return await this._productoAlmacenDetalleRepository.findOne({
        where: { IngresoDetalleID },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async cambiarEstadoDetalle(
    ProductoAlmacenDetalleID: number,
    Estado: boolean,
  ): Promise<boolean> {
    try {
      await this._productoAlmacenDetalleRepository.update(
        ProductoAlmacenDetalleID,
        {
          Estado,
        },
      );

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crearDetalle(
    detalle: CrearProductoAlmacenIngresoDetalleModel,
  ): Promise<boolean> {
    try {
      const productoAlmacenDetalleIntance = new ProductoAlmacenDetalle();
      Object.assign(productoAlmacenDetalleIntance, detalle);
      await productoAlmacenDetalleIntance.save();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerDetalleTodo(
    ProductoAlmacenID: number,
  ): Promise<ProductoAlmacenDetalle[]> {
    try {
      return await this._productoAlmacenDetalleRepository.find({
        where: { ProductoAlmacenID, Estado: EntityStatus.ACTIVE },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async obtenerDetalle(
    ProductoAlmacenID: number,
  ): Promise<ProductoAlmacenDetalle[]> {
    try {
      return await this._productoAlmacenDetalleRepository.find({
        where: {
          Estado: EntityStatus.ACTIVE,
          ProductoAlmacenID,
          EstadoStock: EntityStatus.ACTIVE,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async cambiarEstadoStockDetalle(
    ProductoAlmacenDetalleID: number,
    EstadoStock: boolean,
  ): Promise<boolean> {
    try {
      await this._productoAlmacenDetalleRepository.update(
        ProductoAlmacenDetalleID,
        {
          EstadoStock,
        },
      );

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async ExisteProductoEnELAlmacen(
    AlmacenID: number,
    ProductoID: number,
  ): Promise<ProductoAlmacen> {
    try {
      const productoAlmacen: ProductoAlmacen = await this._productoAlmacenRepository.findOne(
        {
          where: { Estado: EntityStatus.ACTIVE, AlmacenID, ProductoID },
        },
      );
      return productoAlmacen;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async cambioEgreso(
    egreso: number,
    ProductoAlmacenDetalleID: number,
  ): Promise<boolean> {
    try {
      const productoAlmacenDetalleIntance = await this._productoAlmacenDetalleRepository.findOne(
        ProductoAlmacenDetalleID,
      );
      productoAlmacenDetalleIntance.EgresoDetalle = egreso;
      await productoAlmacenDetalleIntance.save();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async cambioIngreso(
    ingreso: number,
    ProductoAlmacenDetalleID: number,
  ): Promise<boolean> {
    try {
      const productoAlmacenDetalleIntance = await this._productoAlmacenDetalleRepository.findOne(
        ProductoAlmacenDetalleID,
      );
      productoAlmacenDetalleIntance.IngresoDetalle = ingreso;
      await productoAlmacenDetalleIntance.save();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(ProductoAlmacenID: number): Promise<boolean> {
    try {
      await this._productoAlmacenRepository.update(ProductoAlmacenID, {
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
      return await this._productoAlmacenRepository
        .createQueryBuilder('ProductoAlmacen')
        .innerJoinAndSelect('Producto.ProductoID', 'Producto')
        .innerJoinAndSelect('Producto.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.Producto', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('ProductoAlmacen.Estado=:Estado', {
          Estado: EntityStatus.ACTIVE,
        })
        .andWhere(
          new Brackets(qb => {
            qb.where('Categoria.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            })
              .orWhere('ProductoAlmacen.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              })
              .orWhere('Producto.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('ProductoAlmacen.ProductoAlmacenID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._productoAlmacenRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          ProductoAlmacenID: 'DESC',
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
      return await this._productoAlmacenRepository
        .createQueryBuilder('ProductoAlmacen')
        .innerJoinAndSelect('ProductoAlmacen.ProductoID', 'Producto')
        .innerJoinAndSelect('Producto.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.ProductoID', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('ProductoAlmacen.Estado=:Estado', {
          Estado: EntityStatus.ACTIVE,
        })
        .andWhere('Producto.Categoria=:CategoriaID', { CategoriaID })
        .andWhere(
          new Brackets(qb => {
            // qb.where('Categoria.Nombre ILIKE :Nombre', {
            //   Nombre: `%${termino}%`,
            // })
            qb.where('Producto.Descripcion ILIKE :Descripcion', {
              Descripcion: `%${termino}%`,
            });
            // .orWhere('Producto.Descripcion ILIKE :Descripcion', {
            //   Descripcion: `%${termino}%`,
            // });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('ProductoAlmacen.ProductoAlmacenID', 'DESC')
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
      return await this._productoAlmacenRepository
        .createQueryBuilder('ProductoAlmacen')
        .innerJoinAndSelect('ProductoAlmacen.ProductoID', 'Producto')
        .innerJoinAndSelect('Producto.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.ProductoID', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('ProductoAlmacen.Estado=:Estado', {
          Estado: EntityStatus.ACTIVE,
        })
        .andWhere('Categoria.CategoriaID=:CategoriaID', { CategoriaID })
        .skip(desde)
        .take(limite)
        .orderBy('ProductoAlmacen.ProductoAlmacenID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPorId(ProductoAlmacenID: number): Promise<ProductoAlmacen> {
    console.log('id que llega a producto almacen', ProductoAlmacenID);
    try {
      const productoAlmacen: ProductoAlmacen = await this._productoAlmacenRepository.findOne(
        ProductoAlmacenID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!productoAlmacen) {
        throw new NotFoundException(
          `el producto almacen con id: ${ProductoAlmacenID} no existe`,
        );
      }
      return productoAlmacen;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async crear(
    productoAlmacen: CrearProductoAlmacenIngresoModel,
  ): Promise<ProductoAlmacen> {
    try {
      const productoAlmacenIntance = new ProductoAlmacen();
      Object.assign(productoAlmacenIntance, productoAlmacen);
      return await productoAlmacenIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
