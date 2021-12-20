import { Variables } from '@utils/manejo-variables/variables';
import { EditarProductoDto } from '../../modulos/producto/api/dto/editar-producto.dto';
import { ProductoModel } from '../../modulos/producto/producto-caso-uso/models/producto';

export class ProductoMapper {
  public static editar(producto: EditarProductoDto): ProductoModel {
    const partiaProducto: EditarProductoDto = {
      CodigoBarra: producto.CodigoBarra ?? null,
      Pantalla: producto.Pantalla ?? null,
      Categoria: producto.Categoria ?? null,
      Descripcion: producto.Descripcion ?? null,
      EstadoIva: producto.EstadoIva ?? null,
      PrecioCompra: producto.PrecioCompra ?? null,
      PrecioVenta: producto.PrecioVenta ?? null,
      EstadoDescuento: producto.EstadoDescuento ?? null,
      PrecioVentaConDescuento: producto.PrecioVentaConDescuento ?? null,
    };
    Object.keys(partiaProducto).forEach(
      key => partiaProducto[key] === null && delete partiaProducto[key],
    );
    const productoLimpio: ProductoModel = Variables.limpiarVariables(
      partiaProducto,
    );

    return productoLimpio;
  }

  public static crear(producto: EditarProductoDto): ProductoModel {
    const partiaProducto: EditarProductoDto = {
      CodigoBarra: producto.CodigoBarra ?? null,
      Pantalla: producto.Pantalla ?? null,
      Categoria: producto.Categoria ?? null,
      Descripcion: producto.Descripcion ?? null,
      EstadoIva: producto.EstadoIva ?? null,
      PrecioCompra: producto.PrecioCompra ?? null,
      PrecioVenta: producto.PrecioVenta ?? null,
      EstadoDescuento: producto.EstadoDescuento ?? null,
      PrecioVentaConDescuento: producto.PrecioVentaConDescuento ?? null,
    };
    Object.keys(partiaProducto).forEach(
      key => partiaProducto[key] === null && delete partiaProducto[key],
    );
    const productoLimpio: ProductoModel = Variables.limpiarVariables(
      partiaProducto,
    );

    return productoLimpio;
  }
}
