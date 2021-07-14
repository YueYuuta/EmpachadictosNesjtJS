import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityStatus } from '@utils/enums';
import { Brackets } from 'typeorm';
import { MenuAlmacen } from '../entidates/menu-almacen.entity';
import { IMenuAlmacenCasoUso } from '../menu-almacen-caso-uso/IMenuAlmacenCasoUso';
import { CrearMenuAlmacenIngresoModel } from '../menu-almacen-caso-uso/models/menu-almacen';
import { MenuAlmacenRepository } from './menu-almacen.repository';

@Injectable()
export class MenuAlmacenRepoService implements IMenuAlmacenCasoUso {
  constructor(
    @InjectRepository(MenuAlmacenRepository)
    private readonly _menuAlmacenRepository: MenuAlmacenRepository,
  ) {}
  async ExisteMenuEnELAlmacen(
    AlmacenID: number,
    MenuID: number,
  ): Promise<MenuAlmacen> {
    try {
      const menuAlmacen: MenuAlmacen = await this._menuAlmacenRepository.findOne(
        {
          where: { Estado: EntityStatus.ACTIVE, AlmacenID, MenuID },
        },
      );
      return menuAlmacen;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async cambioIngreso(
    ingreso: number,
    MenuAlmacenID: number,
  ): Promise<boolean> {
    try {
      const menuAlmacenIntance = await this.obtenerPodId(MenuAlmacenID);
      menuAlmacenIntance.Ingreso = ingreso;
      await menuAlmacenIntance.save();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async cambioEgreso(egreso: number, MenuAlmacenID: number): Promise<boolean> {
    try {
      const menuAlmacenIntance = await this.obtenerPodId(MenuAlmacenID);
      menuAlmacenIntance.Egreso = egreso;
      await menuAlmacenIntance.save();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminar(MenuAlmacenID: number): Promise<boolean> {
    try {
      await this._menuAlmacenRepository.update(MenuAlmacenID, {
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
      return await this._menuAlmacenRepository
        .createQueryBuilder('MenuAlmacen')
        .innerJoinAndSelect('Menu.MenuID', 'Menu')
        .innerJoinAndSelect('Menu.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.Producto', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('MenuAlmacen.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere(
          new Brackets(qb => {
            qb.where('Categoria.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            })
              .orWhere('MenuAlmacen.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              })
              .orWhere('Producto.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('MenuAlmacen.MenuAlmacenID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._menuAlmacenRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          MenuAlmacenID: 'DESC',
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
      return await this._menuAlmacenRepository
        .createQueryBuilder('MenuAlmacen')
        .innerJoinAndSelect('MenuAlmacen.MenuID', 'Menu')
        .innerJoinAndSelect('Menu.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.ProductoID', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('MenuAlmacen.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere('Producto.Categoria=:CategoriaID', { CategoriaID })
        .andWhere(
          new Brackets(qb => {
            // qb.where('Categoria.Nombre ILIKE :Nombre', {
            //   Nombre: `%${termino}%`,
            // })
            qb.where('Menu.Descripcion ILIKE :Descripcion', {
              Descripcion: `%${termino}%`,
            });
            // .orWhere('Producto.Descripcion ILIKE :Descripcion', {
            //   Descripcion: `%${termino}%`,
            // });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('MenuAlmacen.MenuAlmacenID', 'DESC')
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
      return await this._menuAlmacenRepository
        .createQueryBuilder('MenuAlmacen')
        .innerJoinAndSelect('MenuAlmacen.MenuID', 'Menu')
        .innerJoinAndSelect('Menu.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.ProductoID', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('MenuAlmacen.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere('Categoria.CategoriaID=:CategoriaID', { CategoriaID })
        .skip(desde)
        .take(limite)
        .orderBy('MenuAlmacen.MenuAlmacenID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(MenuAlmacenID: number): Promise<MenuAlmacen> {
    console.log('id que llega a menu almacen', MenuAlmacenID);
    try {
      const menuAlmacen: MenuAlmacen = await this._menuAlmacenRepository.findOne(
        MenuAlmacenID,
        {
          where: { Estado: EntityStatus.ACTIVE },
        },
      );

      if (!menuAlmacen) {
        throw new NotFoundException(
          `el menu almacen con id: ${MenuAlmacenID} no existe`,
        );
      }
      return menuAlmacen;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async crear(menuAlmacen: CrearMenuAlmacenIngresoModel): Promise<boolean> {
    try {
      const menuAlmacenIntance = new MenuAlmacen();
      Object.assign(menuAlmacenIntance, menuAlmacen);
      await menuAlmacenIntance.save();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
