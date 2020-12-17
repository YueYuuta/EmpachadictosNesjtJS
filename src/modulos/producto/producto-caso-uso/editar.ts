import { LeerCategoriaCasoUso } from '@modulos/categoria/categoria-caso-uso/leer';
import { SharedService } from '@modulos/shared/services/shared.service';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IProductoCasoUso } from './IProductoCasoUso';
import { ProductoModel } from './models/producto';

const ProductoRepo = () => Inject('ProductoRepo');

@Injectable()
export class EditarProductoCasoUso {
  constructor(
    @ProductoRepo() private readonly _productoRepository: IProductoCasoUso,
    private readonly _sharedService: SharedService,
    private readonly _categoriaService: LeerCategoriaCasoUso,
  ) {}

  async editar(producto: ProductoModel, ProductoID: number): Promise<boolean> {
    const {
      Categoria,
      EstadoIva,
      PrecioCompra,
      PrecioVenta,
      EstadoDescuento,
      PrecioVentaConDescuento,
    } = producto;

    await this._categoriaService.obtenerProId(Categoria);
    producto.Descripcion = producto.Descripcion.toUpperCase();
    const descripcionProducto = await this._productoRepository.verificarDescripcionEditar(
      producto.Descripcion,
      ProductoID,
    );
    if (descripcionProducto) {
      throw new ConflictException(
        `La descripcion: ${producto.Descripcion}, ya existe!`,
      );
    }

    producto.PrecioSinIva = await this._sharedService.calcularPrecioSinIva(
      EstadoIva,
      PrecioVenta,
    );

    producto.PorcentajeGanancia = await this._sharedService.calcularPorcentaje(
      EstadoIva,
      PrecioCompra,
      PrecioVenta,
    );

    if (EstadoDescuento) {
      if (!PrecioVentaConDescuento) {
        throw new ConflictException(`Debe enviar un precio de descuento!`);
      }
      producto.PrecioSinIvaDescuento = await this._sharedService.calcularPrecioSinIva(
        EstadoIva,
        PrecioVentaConDescuento,
      );

      producto.PorcentajeGananciaDescuento = await this._sharedService.calcularPorcentaje(
        EstadoIva,
        PrecioCompra,
        PrecioVentaConDescuento,
      );
    }

    return await this._productoRepository.editar(producto, ProductoID);
  }
}
