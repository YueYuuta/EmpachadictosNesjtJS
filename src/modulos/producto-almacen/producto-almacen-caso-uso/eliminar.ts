import { Inject, Injectable } from '@nestjs/common';
import { EntityStatus } from '@utils/enums';
import { IProductoAlmacenCasoUso } from './IProductoAlmacenCasoUso';

const ProductoAlmacenRepo = () => Inject('ProductoAlmacenRepo');

@Injectable()
export class EliminarProductoAlmacenCasoUso {
  constructor(
    @ProductoAlmacenRepo()
    private readonly _ProductoAlmacenRepository: IProductoAlmacenCasoUso,
  ) {}

  async eliminar(ProductoAlmacenID: number): Promise<boolean> {
    await this._ProductoAlmacenRepository.obtenerPorId(ProductoAlmacenID);
    return await this._ProductoAlmacenRepository.eliminar(ProductoAlmacenID);
  }

  async eliminarDetalle(IngresoDetalleID: number): Promise<boolean> {
    const productoAlmacen = await this._ProductoAlmacenRepository.obtenerDetallePorIngresoDetalleID(
      IngresoDetalleID,
    );
    return await this._ProductoAlmacenRepository.cambiarEstadoDetalle(
      productoAlmacen.ProductoAlmacenDetalleID,
      EntityStatus.INACTIVE,
    );
  }
}
