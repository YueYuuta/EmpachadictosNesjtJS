import { LeerAlmacenCasoUso } from '@modulos/almacen/almacen-caso-uso/leer';
import { LeerProductoCasoUso } from '@modulos/producto/producto-caso-uso/leer';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityStatus } from '@utils/enums';

import { IProductoAlmacenCasoUso } from './IProductoAlmacenCasoUso';
import { LeerProductoAlmacenCasoUso } from './leer';
import {
  CrearProductoAlmacenEgresoModel,
  CrearProductoAlmacenIngresoDetalleModel,
  CrearProductoAlmacenIngresoModel,
} from './models/producto-almacen';

const ProductoAlmacenRepo = () => Inject('ProductoAlmacenRepo');

@Injectable()
export class CrearProductoAlmacenCasoUso {
  constructor(
    @ProductoAlmacenRepo()
    private readonly _productoAlmacenRepository: IProductoAlmacenCasoUso,
    private readonly _productoService: LeerProductoCasoUso,
    private readonly _almacenService: LeerAlmacenCasoUso,
    private readonly _productoAlmacenService: LeerProductoAlmacenCasoUso,
  ) {}

  async crearIngreso(
    Ingreso: CrearProductoAlmacenIngresoModel,
    Detalle: CrearProductoAlmacenIngresoDetalleModel,
  ): Promise<boolean> {
    try {
      let productoAlmacenGuaradado;
      await this._productoService.obtenerProId(Ingreso.ProductoID);
      await this._almacenService.obtenerProId(Ingreso.AlmacenID);
      const productoAlmacen = await this._productoAlmacenService.ExisteProductoEnELAlmacen(
        Ingreso.AlmacenID,
        Ingreso.ProductoID,
      );
      console.log('ajaaaa', productoAlmacen);

      if (productoAlmacen !== undefined) {
        Detalle.ProductoAlmacenID = productoAlmacen.ProductoAlmacenID;
        await this._productoAlmacenRepository.crearDetalle(Detalle);
      } else {
        productoAlmacenGuaradado = await this._productoAlmacenRepository.crear(
          Ingreso,
        );
        Detalle.ProductoAlmacenID = productoAlmacenGuaradado.ProductoAlmacenID;
        await this._productoAlmacenRepository.crearDetalle(Detalle);
      }
      return productoAlmacenGuaradado;
    } catch (error) {
      console.error(error);
      throw new ConflictException(error);
    }
  }

  async crearEgreso(Egreso: CrearProductoAlmacenEgresoModel): Promise<any> {
    let stock = 0;
    let egresoBd = 0;
    const seguimiento = [];
    await this._productoService.obtenerProId(Egreso.ProductoID);
    await this._almacenService.obtenerProId(Egreso.AlmacenID);
    const productoAlmacen = await this._productoAlmacenService.ExisteProductoEnELAlmacen(
      Egreso.AlmacenID,
      Egreso.ProductoID,
    );

    if (productoAlmacen) {
      const egresoDetalle = await this._productoAlmacenRepository.obtenerDetalle(
        Egreso.ProductoAlmacenID,
      );
      for (const egreso of egresoDetalle) {
        stock = stock + egreso.IngresoDetalle;
      }

      if (Egreso.EgresoDetalle > stock) {
        throw new ConflictException('la cantidad supera al stock!');
      }

      for (const egreso of egresoDetalle) {
        const stockUnidad = egreso.IngresoDetalle - egreso.EgresoDetalle;
        if (Egreso.EgresoDetalle != 0) {
          if (stockUnidad > Egreso.EgresoDetalle) {
            egresoBd = egreso.IngresoDetalle + Egreso.EgresoDetalle;
            await this._productoAlmacenRepository.cambioEgreso(
              egresoBd,
              egreso.ProductoAlmacenDetalleID,
            );
            seguimiento.push({
              ProductoAlmacenDetalleID: egreso.ProductoAlmacenDetalleID,
              Cantidad: Egreso.EgresoDetalle,
            });
            Egreso.EgresoDetalle = 0;
          } else {
            egresoBd = stockUnidad + Egreso.EgresoDetalle;
            await this._productoAlmacenRepository.cambioEgreso(
              egresoBd,
              egreso.ProductoAlmacenDetalleID,
            );
            await this._productoAlmacenRepository.cambiarEstadoStockDetalle(
              egreso.ProductoAlmacenDetalleID,
              EntityStatus.INACTIVE,
            );
            seguimiento.push({
              ProductoAlmacenDetalleID: egreso.ProductoAlmacenDetalleID,
              Cantidad: stockUnidad,
            });
            Egreso.EgresoDetalle = Egreso.EgresoDetalle - stockUnidad;
          }
        }
      }
    } else {
      throw new NotFoundException('No existe el producto en el almacen!');
    }
    return seguimiento;
  }
}
