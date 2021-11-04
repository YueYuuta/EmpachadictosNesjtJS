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
import { CalculoModel } from './models/calculo.model';
import { LeerMenuCasoUso } from '@modulos/menu/menu-caso-uso/leer';
import { PedidoModel } from './models/pedido.model';
import { LeerAlmacenCasoUso } from '@modulos/almacen/almacen-caso-uso/leer';
import { LeerClienteCasoUso } from '@modulos/cliente/cliente-caso-uso/leer';
import { plainToClass } from 'class-transformer';
import { LeerPedidoDto } from '../api/dto';
import { LeerMenuAlmacenCasoUso } from '@modulos/menu-almacen/menu-almacen-caso-uso/leer';
import { CrearMenuAlmacenCasoUso } from '@modulos/menu-almacen/menu-almacen-caso-uso/crear';
import { LeerProductoCasoUso } from '@modulos/producto/producto-caso-uso/leer';
import { PantallaEnum } from '@modulos/producto/entidates/pantalla.enum';
import { DespacharDetalleModel } from '@modulos/despachar/pedido-caso-uso/models/despachar-detalle.model';
import { LeerProductoDto } from '@modulos/producto/api/dto';
import { DespacharModel } from '@modulos/despachar/pedido-caso-uso/models/despachar.model';
import { LeerDespacharDto } from '@modulos/despachar/api/dto';
import { CrearDespacharCasoUso } from '@modulos/despachar/pedido-caso-uso/crear';
import { PedidoGateway } from '../gateway/pedido.gateway';
import { LeerDespacharCasoUso } from '@modulos/despachar/pedido-caso-uso/leer';
import { EditarDespacharCasoUso } from '@modulos/despachar/pedido-caso-uso/editar';

const PedidoRepo = () => Inject('PedidoRepo');

@Injectable()
export class EditarPedidoCasoUso {
  readonly PantallaValidas = [
    PantallaEnum.BAR,
    PantallaEnum.COCINA,
    PantallaEnum.DESPACHAR,
    PantallaEnum.PARRILLA,
  ];
  constructor(
    @PedidoRepo() private readonly _pedidoRepository: IPedidoCasoUso,
    private readonly _sharedService: SharedService,
    private readonly _menuSercive: LeerMenuCasoUso,
    private readonly _almacenService: LeerAlmacenCasoUso,
    private readonly _clienteService: LeerClienteCasoUso,
    private readonly _menuAlmacen: LeerMenuAlmacenCasoUso,
    private readonly _productoService: LeerProductoCasoUso,
    private readonly _despacharService: CrearDespacharCasoUso,
    private readonly _editarDespacharService: EditarDespacharCasoUso,
    private readonly _leerDespacharService: LeerDespacharCasoUso,
    private readonly _crearMenuAlmacen: CrearMenuAlmacenCasoUso,
    private readonly _pedidoGateway: PedidoGateway,
  ) {}

  async editar(pedido: PedidoModel, PedidoID: number): Promise<LeerPedidoDto> {
    const pedidoBD: any = await this._pedidoRepository.obtenerPodId(PedidoID);
    // console.log('holaaaa');
    if (pedido.Detalle.length === 0) {
      throw new NotFoundException('Igrese el detalle del pedido!');
    }
    // console.log('lo que me llega al crar ', pedido);
    await this._almacenService.obtenerProId(pedido.AlmacenID);
    await this._clienteService.obtenerProId(pedido.ClienteID);
    const totales = await this.validarDetalle(pedido.Detalle);
    const despacharAgregar = await this.obtenerAgregarDespachar(
      pedidoBD.Detalle,
      pedido.Detalle,
    );

    const listoParaEditarDespachar = await this.crearArrayProductoDespachar(
      despacharAgregar,
    );

    console.log('pedido todo editado', pedidoBD);

    pedido.Detalle = totales.Detalle;
    pedido.Subtotal0 = totales.Totales.Subtotal0;
    pedido.Subtotal12 = totales.Totales.Subtotal12;
    pedido.Subtotal = totales.Totales.Subtotal;
    pedido.Total = totales.Totales.Total;
    pedido.Iva = totales.Totales.Iva;
    pedido.TotalCompra = totales.Totales.TotalCompra;
    const pedidoGuardado = await this._pedidoRepository.editar(
      pedido,
      PedidoID,
    );
    // return plainToClass(LeerPedidoDto, pedidoGuardado);
    // console.log('Sdasdadasdasd', pedido);
    for (const menu of pedidoBD.Detalle) {
      // console.log(menu.Cantidad);
      // const menuBd = await this._menuSercive.obtenerProId(menu.MenuID);
      // console.log('detalle del menu', menuBd.Detalle);
      await this._crearMenuAlmacen.crearEgreso({
        AlmacenID: pedidoBD.AlmacenID.AlmacenID,
        Egreso: menu.Cantidad * -1,
        MenuID: menu.MenuID,
      });
    }

    for (const menu of pedido.Detalle) {
      // console.log(menu.Cantidad);
      // const menuBd = await this._menuSercive.obtenerProId(menu.MenuID);
      // console.log('detalle del menu', menuBd.Detalle);
      await this._crearMenuAlmacen.crearEgreso({
        AlmacenID: pedidoBD.AlmacenID.AlmacenID,
        Egreso: menu.Cantidad,
        MenuID: menu.MenuID,
      });
    }
    // return plainToClass(LeerPedidoDto, pedidoGuardado);
    const extra = {
      MesaID: pedidoBD.MesaID,
      PedidoID: pedidoBD.PedidoID,
      ObservacionBar: pedido.ObservacionBar,
      ObservacionCocina: pedido.ObservacionCocina,
      ObservacionParrilla: pedido.ObservacionParrilla,
      UsuarioID: pedidoBD.UsuarioID,
      AlmacenID: pedidoBD.AlmacenID,
      FechaPedido: pedido.FechaPedido,
      FechaPedidoEntrega: pedido.FechaPedidoEntrega,
    };
    const despachar = await this.guardarDespachar(
      listoParaEditarDespachar,
      extra,
    );
    if (pedido.MesaID != 2 && !pedido.FechaPedido) {
      this._pedidoGateway.enviarDespachar(despachar);
    }

    return plainToClass(LeerPedidoDto, pedidoGuardado);
    // return pedido;
    // return plainToClass(LeerPedidoDto, pedidoGuardado);
  }

  async obtenerAgregarDespachar(
    detalleViejo: any[],
    detalleNuevo: any[],
  ): Promise<any> {
    const salida = [];
    for (const nuevo of detalleNuevo) {
      const nuevoCopia = { ...nuevo };
      let contador = 0;
      for (const viejo of detalleViejo) {
        let cantidad = 0;
        console.log(
          nuevo.MenuID,
          viejo.MenuID,
          'sfdfsdfsdfsdf5555555555555555555555555',
        );
        if (nuevo.MenuID === viejo.MenuID.MenuID) {
          if (nuevo.Cantidad != viejo.Cantidad) {
            if (nuevo.Cantidad > viejo.Cantidad) {
              cantidad = Number(nuevo.Cantidad) - Number(viejo.Cantidad);
              nuevoCopia.Cantidad = cantidad;
              salida.push(nuevoCopia);
            }
          }

          contador = 1;
        }
      }
      if (contador === 0) {
        salida.push(nuevoCopia);
      }
    }
    return salida;
  }

  async obtenerEliminarDespachar(
    detalleViejo: any[],
    detalleNuevo: any[],
  ): Promise<any> {
    for (const viejo of detalleViejo) {
      const viejoCopia = { ...viejo };
      const salida = [];
      let contador = 0;
      for (const nuevo of detalleNuevo) {
        let cantidad = 0;
        if (nuevo.MenuID === viejo.MenuID) {
          if (nuevo.Cantidad != viejo.Cantidad) {
            if (viejo.Cantidad > nuevo.Cantidad) {
              cantidad = Number(viejo.Cantidad) - Number(nuevo.Cantidad);
              viejoCopia.Cantidad = cantidad;
              salida.push(viejoCopia);
            }
          }

          contador = 1;
        }
      }
      if (contador === 0) {
        salida.push(viejoCopia);
      }
    }
  }

  async guardarDespachar(despacharDetalle: any, extra: any): Promise<any> {
    let despacharBar: LeerDespacharDto;
    let despacharCocina: LeerDespacharDto;
    let despacharParrilla: LeerDespacharDto;
    let estadoPedido = false;
    if (extra.FechaPedido && extra.FechaPedidoEntrega) {
      estadoPedido = true;
    }
    if (despacharDetalle.Bar.length != 0) {
      const despachar: DespacharModel = {
        Detalle: despacharDetalle.Bar,
        MesaID: extra.MesaID,
        PedidoID: extra.PedidoID,
        Tipo: PantallaEnum.BAR,
        UsuarioID: extra.UsuarioID,
        AlmacenID: extra.AlmacenID,
        Observacion: extra.ObservacionBar,
        EstadoPedido: estadoPedido,
        FechaPedido: extra.FechaPedido,
        FechaPedidoEntrega: extra.FechaPedidoEntrega,
      };
      const despacharBd = await this._leerDespacharService.obtenerTodosPorPedidoIdYTipo(
        despachar.PedidoID,
        PantallaEnum.BAR,
      );
      if (!despacharBd) {
        despacharCocina = await this._despacharService.crear(despachar);
      } else {
        despacharCocina = await this._editarDespacharService.editar(
          despachar,
          despacharBd.DespacharID,
        );
      }
    }

    if (despacharDetalle.Cocina.length != 0) {
      const despachar: DespacharModel = {
        Detalle: despacharDetalle.Cocina,
        MesaID: extra.MesaID,
        PedidoID: extra.PedidoID,
        Tipo: PantallaEnum.COCINA,
        UsuarioID: extra.UsuarioID,
        AlmacenID: extra.AlmacenID,
        Observacion: extra.ObservacionCocina,
        EstadoPedido: estadoPedido,
        FechaPedido: extra.FechaPedido,
        FechaPedidoEntrega: extra.FechaPedidoEntrega,
      };
      const despacharBd = await this._leerDespacharService.obtenerTodosPorPedidoIdYTipo(
        despachar.PedidoID,
        PantallaEnum.COCINA,
      );
      if (!despacharBd) {
        despacharCocina = await this._despacharService.crear(despachar);
      } else {
        despacharCocina = await this._editarDespacharService.editar(
          despachar,
          despacharBd.DespacharID,
        );
      }
    }

    if (despacharDetalle.Parrilla.length != 0) {
      const despachar: DespacharModel = {
        Detalle: despacharDetalle.Parrilla,
        MesaID: extra.MesaID,
        PedidoID: extra.PedidoID,
        Tipo: PantallaEnum.PARRILLA,
        UsuarioID: extra.UsuarioID,
        AlmacenID: extra.AlmacenID,
        Observacion: extra.ObservacionParrilla,
        EstadoPedido: estadoPedido,
        FechaPedido: extra.FechaPedido,
        FechaPedidoEntrega: extra.FechaPedidoEntrega,
      };
      const despacharBd = await this._leerDespacharService.obtenerTodosPorPedidoIdYTipo(
        despachar.PedidoID,
        PantallaEnum.PARRILLA,
      );
      if (!despacharBd) {
        despacharCocina = await this._despacharService.crear(despachar);
      } else {
        despacharCocina = await this._editarDespacharService.editar(
          despachar,
          despacharBd.DespacharID,
        );
      }
    }
    return {
      Bar: despacharBar,
      Cocina: despacharCocina,
      Parrilla: despacharParrilla,
    };
  }

  async crearArrayProductoEliminarDespachar(detalle: any[]): Promise<any> {
    let detalleDespacharBar = [];
    let detalleDespacharCocina = [];
    let detalleDespacharParrilla = [];
  }

  async crearArrayProductoDespachar(detalle: any[]): Promise<any> {
    let detalleDespacharBar = [];
    let detalleDespacharCocina = [];
    let detalleDespacharParrilla = [];
    for (const menu of detalle) {
      const menuBd = await this._menuSercive.obtenerProId(menu.MenuID);
      const despacharItem = await this.validarProductosParaDespachar(
        menuBd.Detalle,
        menu.Descripcion,
        menu.Cantidad,
      );
      // console.log('sasasdasda', despacharItem.Bar);
      detalleDespacharBar = detalleDespacharBar.concat(despacharItem.Bar);
      detalleDespacharCocina = detalleDespacharCocina.concat(
        despacharItem.Cocina,
      );
      detalleDespacharParrilla = detalleDespacharParrilla.concat(
        despacharItem.Parrilla,
      );
    }
    return {
      Bar: detalleDespacharBar,
      Cocina: detalleDespacharCocina,
      Parrilla: detalleDespacharParrilla,
    };
  }

  async validarDetalle(
    detalle: any[],
  ): Promise<{
    Detalle: PedidoDetalleModel[];
    Totales: CalculoModel;
    // Despachar: any;
  }> {
    // let detalleDespacharBar = [];
    // let detalleDespacharCocina = [];
    // let detalleDespacharParrilla = [];
    let Subtotal0 = 0;
    let Subtotal12 = 0;
    let Iva = 0;
    let TotalCompra = 0;
    for (let index = 0; index < detalle.length; index++) {
      const menu = detalle[index];
      const menuBd = await this._menuSercive.obtenerProId(menu.MenuID);
      // console.log('lo que llega al crear un pedido', menuBd.Detalle);
      //   const despacharItem = await this.validarProductosParaDespachar(
      //     menuBd.Detalle,
      //     menu.Descripcion,
      //     menu.Cantidad,
      //   );
      //   // console.log('sasasdasda', despacharItem.Bar);
      //   detalleDespacharBar = detalleDespacharBar.concat(despacharItem.Bar);
      //   detalleDespacharCocina = detalleDespacharCocina.concat(
      //     despacharItem.Cocina,
      //   );
      //   detalleDespacharParrilla = detalleDespacharParrilla.concat(
      //     despacharItem.Parrilla,
      //   );

      // console.log('pinches totales', detalleDespacharBar);

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
      detalle[index].TotalIva =
        (menuBd.PrecioVenta - menuBd.PrecioSinIva) * menu.Cantidad;
      detalle[index].TotalsinIva = menuBd.PrecioSinIva * menu.Cantidad;
      detalle[index].Total = menuBd.PrecioVenta * menu.Cantidad;
      detalle[index].TotalCompra = menuBd.PrecioCompra * menu.Cantidad;
      // console.log('esta es disque el iva', detalle[index].Iva);
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
      //   Despachar: {
      //     Bar: detalleDespacharBar,
      //     Cocina: detalleDespacharCocina,
      //     Parrilla: detalleDespacharParrilla,
      //   },
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

  async validarProductosParaDespachar(
    Producto: any,
    menuDescripcion: string,
    menuCantidad: number,
  ): Promise<any> {
    // console.log('ver la cantidad', Producto);
    let detalleDespacharBar = [];
    let detalleDespacharCocina = [];
    let detalleDespacharParrilla = [];
    for (const producto of Producto) {
      const productoBd = await this._productoService.obtenerProId(
        producto.ProductoID.ProductoID,
      );

      if (!this.esUnaPantallaValida(productoBd.Pantalla)) {
        throw new ConflictException(
          `La pantalla: ${productoBd.Pantalla}, no es un dato valido en el producto : ${productoBd.Descripcion} del menu ${menuDescripcion}!`,
        );
      }
      const item = producto.Cantidad * menuCantidad;
      // console.log('item', item);
      switch (productoBd.Pantalla) {
        case PantallaEnum.BAR:
          detalleDespacharBar = await this.guardarArray(item, productoBd);

          break;
        case PantallaEnum.COCINA:
          detalleDespacharCocina = await this.guardarArray(item, productoBd);
          break;
        case PantallaEnum.PARRILLA:
          detalleDespacharParrilla = await this.guardarArray(item, productoBd);
          break;

        default:
          break;
      }
    }
    return {
      Bar: detalleDespacharBar,
      Parrilla: detalleDespacharParrilla,
      Cocina: detalleDespacharCocina,
    };
  }
  private esUnaPantallaValida(pantalla: PantallaEnum): boolean {
    const idx = this.PantallaValidas.indexOf(pantalla);
    return idx !== -1;
  }

  private async guardarArray(
    item: number,
    productoBd: LeerProductoDto,
  ): Promise<any[]> {
    const detalleDespachar = [];
    for (let index = 0; index < item; index++) {
      const itemDespachar: DespacharDetalleModel = {
        Cantidad: 1,
        ProductoID: productoBd.ProductoID,
        Observacion: 'sasdasd',
      };
      detalleDespachar.push(itemDespachar);
    }
    return detalleDespachar;
  }
}
