import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityStatus } from '@utils/enums';
import { Brackets, Not } from 'typeorm';
import { Menu } from '../entidates/menu.entity';
import { IMenuCasoUso } from '../menu-caso-uso/IMenuCasoUso';
import { MenuModel } from '../menu-caso-uso/models/menu';
import { MenuRepository } from './menu.repository';
import { MenuDetalleRepository } from './menu-detalle.repository';
import { MenuDetalle } from '../entidates/menu-detalle.entity';

@Injectable()
export class MenuRepoService implements IMenuCasoUso {
  constructor(
    @InjectRepository(MenuRepository)
    private readonly _menuRepository: MenuRepository,
    @InjectRepository(MenuDetalleRepository)
    private readonly _menuDetalleRepository: MenuDetalleRepository,
  ) {}
  async verificarDescripcion(descripcion: string): Promise<Menu> {
    try {
      return await this._menuRepository.findOne({
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
    MenuID: number,
  ): Promise<Menu> {
    try {
      return await this._menuRepository.findOne({
        where: {
          Estado: EntityStatus.ACTIVE,
          Descripcion: descripcion,
          MenuID: Not(MenuID),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async cambiarEstado(estado: boolean, MenuID: number): Promise<void> {
    try {
      await this._menuDetalleRepository
        .createQueryBuilder()
        .update(MenuDetalle)
        .set({ Estado: estado })
        .where('Menu = :id', { id: MenuID })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async eliminar(MenuID: number): Promise<boolean> {
    try {
      await this._menuRepository.update(MenuID, {
        Estado: EntityStatus.INACTIVE,
      });
      await this.cambiarEstado(EntityStatus.INACTIVE, MenuID);
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
      return await this._menuRepository
        .createQueryBuilder('Menu')
        .innerJoinAndSelect('Menu.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.Producto', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('Menu.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere(
          new Brackets(qb => {
            qb.where('Categoria.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            })
              .orWhere('Menu.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              })
              .orWhere('Producto.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Menu.MenuID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPaginado(desde: number, limite: number): Promise<any> {
    try {
      return await this._menuRepository.findAndCount({
        where: { Estado: EntityStatus.ACTIVE },
        skip: desde,
        take: limite,
        order: {
          MenuID: 'DESC',
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
      return await this._menuRepository
        .createQueryBuilder('Menu')
        .innerJoinAndSelect('Menu.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.Producto', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('Menu.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere('Producto.Categoria=:CategoriaID', { CategoriaID })
        .andWhere(
          new Brackets(qb => {
            qb.where('Categoria.Nombre ILIKE :Nombre', {
              Nombre: `%${termino}%`,
            })
              .orWhere('Menu.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              })
              .orWhere('Producto.Descripcion ILIKE :Descripcion', {
                Descripcion: `%${termino}%`,
              });
          }),
        )
        .skip(desde)
        .take(limite)
        .orderBy('Menu.MenuID', 'DESC')
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
      return await this._menuRepository
        .createQueryBuilder('Menu')
        .innerJoinAndSelect('Menu.Detalle', 'Detalle')
        .innerJoinAndSelect('Detalle.Producto', 'Producto')
        .innerJoinAndSelect('Producto.Categoria', 'Categoria')
        .where('Menu.Estado=:Estado', { Estado: EntityStatus.ACTIVE })
        .andWhere('Producto.Categoria=:CategoriaID', { CategoriaID })
        .skip(desde)
        .take(limite)
        .orderBy('Menu.MenuID', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async obtenerPodId(MenuID: number): Promise<Menu> {
    try {
      const menu: Menu = await this._menuRepository.findOne(MenuID, {
        where: { Estado: EntityStatus.ACTIVE },
      });

      if (!menu) {
        throw new NotFoundException(`el menu con id: ${MenuID} no existe`);
      }
      return menu;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }

  async eliminarBd(MenuID: number): Promise<boolean> {
    try {
      await this._menuDetalleRepository
        .createQueryBuilder('MenuDetalle')
        .delete()
        .where('Menu=:MenuID', { MenuID })
        .execute();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async editar(menu: MenuModel, MenuID: number): Promise<boolean> {
    try {
      await this.eliminarBd(MenuID);
      const menuIntance = await this.obtenerPodId(MenuID);
      this._menuRepository.merge(menuIntance, menu);
      await menuIntance.save();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
  async crear(menu: MenuModel): Promise<Menu> {
    try {
      const menuIntance = new Menu();
      Object.assign(menuIntance, menu);
      return await menuIntance.save();
    } catch (error) {
      throw new InternalServerErrorException(
        `no se pudo establecer conexion, ${error}`,
      );
    }
  }
}
