import { Inject, Injectable, ConflictException } from '@nestjs/common';

import { LeerMenuDto } from '../api/dto';

import { plainToClass } from 'class-transformer';
import { SharedService } from '@modulos/shared/services/shared.service';

import { IMenuCasoUso } from './IMenuCasoUso';
import { MenuModel } from './models/menu';
import { MenuDetalleModel } from './models/menu-detalle';

import { LeerProductoDto } from '@modulos/producto/api/dto';
import { TipoVariable } from '@utils/enums';
import { Menu } from '../entidates/menu.entity';
import { LeerProductoCasoUso } from '@modulos/producto/producto-caso-uso/leer';

const MenuRepo = () => Inject('MenuRepo');

@Injectable()
export class CrearMenuCasoUso {
  constructor(
    @MenuRepo() private readonly _menuRepository: IMenuCasoUso,
    private readonly _sharedService: SharedService,
    private readonly _productoSercive: LeerProductoCasoUso,
  ) {}

  async crear(menu: MenuModel): Promise<LeerMenuDto> {
    const { EstadoPrecioVentaDinamico, EstadoIva, PrecioVenta } = menu;
    const calculo = await this.validarDetalle(menu.Detalle);

    menu.Descripcion = menu.Descripcion.toUpperCase();
    const descripcionMenu = await this._menuRepository.verificarDescripcion(
      menu.Descripcion,
    );
    if (descripcionMenu) {
      throw new ConflictException(
        `La descripcion: ${menu.Descripcion}, ya exisste!`,
      );
    }
    if (EstadoPrecioVentaDinamico) {
      menu.PrecioSinIva = await this._sharedService.calcularPrecioSinIva(
        EstadoIva,
        PrecioVenta,
      );
    } else {
      menu.PrecioVenta = calculo.precioVenta;
      menu.PrecioSinIva = calculo.precioSinIva;
    }

    menu.PrecioCompra = calculo.precioCompra;

    menu.PorcentajeGanancia = await this._sharedService.calcularPorcentaje(
      EstadoIva,
      calculo.precioCompra,
      menu.PrecioVenta,
    );
    const menuGuardado: Menu = await this._menuRepository.crear(menu);
    return plainToClass(LeerMenuDto, menuGuardado);
  }

  async validarDetalle(
    detalle: MenuDetalleModel[],
  ): Promise<{
    precioVenta: number;
    precioCompra: number;
    precioSinIva: number;
  }> {
    let precioVenta: number = 0;
    let precioCompra: number = 0;
    let precioSinIva: number = 0;
    for (const producto of detalle) {
      const productoBd: LeerProductoDto = await this._productoSercive.obtenerProId(
        producto.Producto,
      );
      precioVenta = precioVenta + productoBd.PrecioVenta * producto.Cantidad;
      precioCompra = precioCompra + productoBd.PrecioCompra * producto.Cantidad;
      precioSinIva = precioSinIva + productoBd.PrecioSinIva * producto.Cantidad;
      if (
        producto.Cantidad <= 0 ||
        !producto.Cantidad ||
        typeof producto.Cantidad != TipoVariable.NUMBER
      ) {
        throw new ConflictException(
          `error al ingresar la cantidad en el producto: ${productoBd.Descripcion}!`,
        );
      }
    }
    return { precioVenta, precioCompra, precioSinIva };
  }
}
