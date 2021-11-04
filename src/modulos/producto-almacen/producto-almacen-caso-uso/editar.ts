import { Inject, Injectable } from '@nestjs/common';
import { EntityStatus } from '@utils/enums';

import { IProductoAlmacenCasoUso } from './IProductoAlmacenCasoUso';

const ProductoAlmacenRepo = () => Inject('ProductoAlmacenRepo');

@Injectable()
export class EditarProductoAlmacenCasoUso {
  constructor(
    @ProductoAlmacenRepo()
    private readonly _productoAlmacenRepository: IProductoAlmacenCasoUso,
  ) {}
  async editarIngresoProductoAlmacenDetalle(
    IngresoDetalleID: number,
    ingreso: number,
  ): Promise<boolean> {
    const detalle = await this._productoAlmacenRepository.obtenerDetallePorIngresoDetalleID(
      IngresoDetalleID,
    );

    const detalleEditado = await this._productoAlmacenRepository.cambioIngreso(
      detalle.ProductoAlmacenDetalleID,
      ingreso,
    );

    const stock = ingreso - detalle.EgresoDetalle;
    if (stock > 0) {
      await this._productoAlmacenRepository.cambiarEstadoStockDetalle(
        detalle.ProductoAlmacenDetalleID,
        EntityStatus.ACTIVE,
      );
    } else {
      await this._productoAlmacenRepository.cambiarEstadoStockDetalle(
        detalle.ProductoAlmacenDetalleID,
        EntityStatus.INACTIVE,
      );
    }

    return detalleEditado;
  }
}
