import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SharedService } from '@modulos/shared/services/shared.service';

import { IIngresoCasoUso } from './IIngresoCasoUso';

0;
import { IngresoModel } from './models/ingreso.model';
import { LeerAlmacenCasoUso } from '@modulos/almacen/almacen-caso-uso/leer';

import { LeerProveedorCasoUso } from '@modulos/proveedor/proveedor-caso-uso/leer';
import { LeerProductoCasoUso } from '@modulos/producto/producto-caso-uso/leer';
import { IngresoDetalleModel } from './models/ingreso-detalle.model';
import { CalculoModel } from './models/calculo.model';
import { plainToClass } from 'class-transformer';
import { LeerIngresoDto } from '../api/dto';
import { CrearProductoAlmacenCasoUso } from '@modulos/producto-almacen/producto-almacen-caso-uso/crear';
import { TipoVariable } from '@utils/enums';
const IngresoRepo = () => Inject('IngresoRepo');

@Injectable()
export class CrearIngresoCasoUso {
  constructor(
    @IngresoRepo() private readonly _ingresoRepository: IIngresoCasoUso,
    private readonly _sharedService: SharedService,
    private readonly _almacenService: LeerAlmacenCasoUso,
    private readonly _productoService: LeerProductoCasoUso,
    private readonly _proveedorService: LeerProveedorCasoUso,
    private readonly _productoAlmacenService: CrearProductoAlmacenCasoUso,
  ) {}

  async crear(ingreso: IngresoModel): Promise<LeerIngresoDto> {
    //validaciones
    if (ingreso.Detalle.length === 0) {
      throw new NotFoundException('Igrese el detalle del ingreso!');
    }
    await this._almacenService.obtenerProId(ingreso.AlmacenID);
    await this._proveedorService.obtenerProId(ingreso.ProveedorID);

    //obtener los resultados
    const totales = await this.validarDetalle(ingreso.Detalle);
    ingreso.Detalle = totales.Detalle;
    ingreso.Subtotal0 = totales.Totales.Subtotal0;
    ingreso.Subtotal12 = totales.Totales.Subtotal12;
    ingreso.Subtotal = totales.Totales.Subtotal;
    ingreso.Total = totales.Totales.Total;
    ingreso.Iva = totales.Totales.Iva;

    const ingresoGuardado = await this._ingresoRepository.crear(ingreso);
    const ingresoBd = await this._ingresoRepository.obtenerPorId(
      ingresoGuardado.IngresoID,
    );

    await this.crearStock(ingreso.AlmacenID, ingresoBd.Detalle);

    return plainToClass(LeerIngresoDto, ingresoGuardado);
  }

  private async crearStock(
    AlmacenID: number,
    // cabecera: CrearProductoAlmacenIngresoModel,
    detalle: any[],
  ): Promise<any> {
    for (const producto of detalle) {
      const cabecera = {
        AlmacenID,
        ProductoID: producto.ProductoID.ProductoID,
      };
      const detalle = {
        IngresoDetalle: producto.Cantidad,

        PrecioCompra: producto.PrecioCompra,

        Lote: producto.Lote,

        IngresoDetalleID: producto.IngresoDetalleID,
      };

      console.log(detalle, producto);
      await this._productoAlmacenService.crearIngreso(cabecera, detalle);
    }
  }

  private async validarDetalle(
    detalle: IngresoDetalleModel[],
  ): Promise<{ Detalle: IngresoDetalleModel[]; Totales: CalculoModel }> {
    let Subtotal0 = 0;
    let Subtotal12 = 0;
    let Iva = 0;
    for (let index = 0; index < detalle.length; index++) {
      const producto = detalle[index];
      const productoDb = await this._productoService.obtenerProId(
        producto.ProductoID,
      );

      if (
        producto.Cantidad <= 0 ||
        !producto.Cantidad ||
        typeof producto.Cantidad != TipoVariable.NUMBER
      ) {
        throw new ConflictException(
          `Ingrese una cantidad valida en el producto: ${productoDb.Descripcion}!`,
        );
      }

      const precioCompra = Number(producto.PrecioCompra);
      console.log(!precioCompra);
      if (precioCompra < 0 || typeof precioCompra != TipoVariable.NUMBER) {
        throw new ConflictException(
          `Ingrese un precio de compra valido en el producto: ${productoDb.Descripcion}!`,
        );
      }
      detalle[index].Descripcion = productoDb.Descripcion;
      detalle[index].EstadoIva = productoDb.EstadoIva;
      detalle[index].Iva = await this._sharedService.calcularIva(
        productoDb.EstadoIva,
        producto.PrecioCompra,
      );
      detalle[
        index
      ].PorcentajeGanancia = await this._sharedService.calcularPorcentaje(
        productoDb.EstadoIva,
        producto.PrecioCompra,
        productoDb.PrecioVenta,
      );
      detalle[index].Total = producto.PrecioCompra * producto.Cantidad;
      detalle[index].TotalIva = await this._sharedService.calcularIva(
        productoDb.EstadoIva,
        detalle[index].Total,
      );
      detalle[index].TotalsinIva =
        detalle[index].Total - detalle[index].TotalIva;
      if (producto.EstadoIva) {
        Subtotal12 = Subtotal12 + detalle[index].TotalsinIva;
      } else {
        Subtotal0 = Subtotal0 + detalle[index].TotalsinIva;
      }
      Iva = Iva + detalle[index].TotalIva;
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
      },
    };
  }
}
