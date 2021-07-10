import {
  Inject,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { SharedService } from '@modulos/shared/services/shared.service';

import { TipoVariable } from '@utils/enums';

import { IPedidoCasoUso } from './IPedidoCasoUso';

import { PedidoDetalleModel } from './models/pedido-detalle.model';
import { LeerMenuDto } from '@modulos/menu/api/dto';
import { CalculoModel } from './models/calculo.model';
import { LeerMenuCasoUso } from '@modulos/menu/menu-caso-uso/leer';
import { PedidoModel } from './models/pedido.model';
import { LeerAlmacenCasoUso } from '@modulos/almacen/almacen-caso-uso/leer';
import { LeerClienteCasoUso } from '@modulos/cliente/cliente-caso-uso/leer';
import { plainToClass } from 'class-transformer';
import { LeerPedidoDto } from '../api/dto';
import { LeerMenuAlmacenCasoUso } from '@modulos/menu-almacen/menu-almacen-caso-uso/leer';
import { CrearMenuAlmacenCasoUso } from '@modulos/menu-almacen/menu-almacen-caso-uso/crear';
import { LeerProductoDto } from '@modulos/producto/api/dto';

const PedidoRepo = () => Inject('PedidoRepo');

@Injectable()
export class CrearPedidoCasoUso {
  constructor(
    @PedidoRepo() private readonly _pedidoRepository: IPedidoCasoUso,
    private readonly _sharedService: SharedService,
    private readonly _menuSercive: LeerMenuCasoUso,
    private readonly _almacenService: LeerAlmacenCasoUso,
    private readonly _clienteService: LeerClienteCasoUso,
    private readonly _menuAlmacen: LeerMenuAlmacenCasoUso,

    private readonly _crearMenuAlmacen: CrearMenuAlmacenCasoUso,
  ) {}

  async crear(pedido: PedidoModel): Promise<LeerPedidoDto> {
    console.log('holaaaa');
    if (pedido.Detalle.length === 0) {
      throw new NotFoundException('Igrese el detalle del pedido!');
    }
    console.log(pedido.Detalle);
    await this._almacenService.obtenerProId(pedido.AlmacenID);
    await this._clienteService.obtenerProId(pedido.ClienteID);
    const totales = await this.validarDetalle(pedido.Detalle);
    pedido.Detalle = totales.Detalle;
    pedido.Subtotal0 = totales.Totales.Subtotal0;
    pedido.Subtotal12 = totales.Totales.Subtotal12;
    pedido.Subtotal = totales.Totales.Subtotal;
    pedido.Total = totales.Totales.Total;
    pedido.Iva = totales.Totales.Iva;
    pedido.TotalCompra = totales.Totales.TotalCompra;
    const pedidoGuardado = await this._pedidoRepository.crear(pedido);
    for (const menu of pedido.Detalle) {
      // const menuBd = await this._menuSercive.obtenerProId(menu.MenuID);
      // console.log('detalle del menu', menuBd.Detalle);
      await this._crearMenuAlmacen.crearEgreso({
        AlmacenID: pedidoGuardado.AlmacenID,
        Egreso: menu.Cantidad,
        MenuID: menu.MenuID,
      });
    }

    return plainToClass(LeerPedidoDto, pedidoGuardado);
    // return pedido;
    // return plainToClass(LeerPedidoDto, pedidoGuardado);
  }

  async validarDetalle(
    detalle: any[],
  ): Promise<{ Detalle: PedidoDetalleModel[]; Totales: CalculoModel }> {
    let Subtotal0 = 0;
    let Subtotal12 = 0;
    let Iva = 0;
    let TotalCompra = 0;
    for (let index = 0; index < detalle.length; index++) {
      const menu = detalle[index];
      // console.log('lo que llega al crear un pedido', detalle[2]);
      const menuBd = await this._menuSercive.obtenerProId(menu.MenuID);

      const menuAlmacen = await this._menuAlmacen.obtenerProId(
        detalle[index].MenuAlmacenID,
      );
      const stock: number = menuAlmacen.Ingreso - menuAlmacen.Egreso;

      if (stock < menu.Cantidad) {
        throw new ConflictException(
          `La cantidad de: ${menuBd.Descripcion} super al stock el cual es: ${stock}`,
        );
      }

      if (
        menu.Cantidad <= 0 ||
        !menu.Cantidad ||
        typeof menu.Cantidad != TipoVariable.NUMBER
      ) {
        throw new ConflictException(
          `Ingrese una cantidad valida en el producto: ${menuBd.Descripcion}!`,
        );
      }
      detalle[index].Descripcion = menuBd.Descripcion;
      detalle[index].EstadoIva = menuBd.EstadoIva;
      detalle[index].EstadoPrecioVentaDinamico =
        menuBd.EstadoPrecioVentaDinamico;
      detalle[index].PorcentajeGanancia = menuBd.PorcentajeGanancia;
      detalle[index].PrecioCompra = menuBd.PrecioCompra;
      detalle[index].PrecioSinIva = menuBd.PrecioSinIva;
      detalle[index].PrecioVenta = menuBd.PrecioVenta;
      detalle[index].Iva = await this._sharedService.calcularIva(
        menuBd.EstadoIva,
        menuBd.PrecioVenta,
      );
      detalle[index].TotalIva = detalle[index].Iva * menu.Cantidad;
      detalle[index].TotalsinIva = menuBd.PrecioSinIva * menu.Cantidad;
      detalle[index].Total = menuBd.PrecioVenta * menu.Cantidad;
      detalle[index].TotalCompra = menuBd.PrecioCompra * menu.Cantidad;

      if (menu.EstadoIva) {
        Subtotal12 = Subtotal12 + detalle[index].TotalsinIva;
      } else {
        Subtotal0 = Subtotal0 + detalle[index].TotalsinIva;
      }
      Iva = Iva + detalle[index].TotalIva;
      TotalCompra = TotalCompra + detalle[index].TotalCompra;
    }
    const subtotal = Subtotal0 + Subtotal12;
    const total = subtotal + Iva;
    return {
      Detalle: detalle,
      Totales: {
        Subtotal0: Subtotal0,

        Subtotal12: Subtotal12,

        Iva: Iva,

        Subtotal: subtotal,

        Total: total,

        TotalCompra: TotalCompra,
      },
    };
  }

  async validarProductosParaDespachar(Producto: LeerProductoDto): Promise<any> {
    return Producto;
  }
}
