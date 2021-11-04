import {
  CrearProductoAlmacenEgresoDto,
  CrearProductoAlmacenIngresoDto,
} from '@modulos/producto-almacen/api/dto';
import {
  CrearProductoAlmacenEgresoModel,
  CrearProductoAlmacenIngresoModel,
} from '@modulos/producto-almacen/producto-almacen-caso-uso/models/producto-almacen';
import { Variables } from '@utils/manejo-variables/variables';

export class ProductoAlmacenMapper {
  public static crearIngreso(
    productoAlmacen: CrearProductoAlmacenIngresoDto,
  ): CrearProductoAlmacenIngresoModel {
    const partialProductoAlmacen: CrearProductoAlmacenIngresoDto = {
      AlmacenID: productoAlmacen.AlmacenID ?? null,
      Ingreso: productoAlmacen.Ingreso ?? null,
      ProductoID: productoAlmacen.ProductoID ?? null,
    };
    Object.keys(partialProductoAlmacen).forEach(
      key =>
        partialProductoAlmacen[key] === null &&
        delete partialProductoAlmacen[key],
    );
    const categoriaLimpio = Variables.limpiarVariables(partialProductoAlmacen);

    return categoriaLimpio;
  }

  public static crearEgreso(
    productoAlmacen: CrearProductoAlmacenEgresoDto,
  ): CrearProductoAlmacenEgresoModel {
    const partialProductoAlmacen: CrearProductoAlmacenEgresoDto = {
      AlmacenID: productoAlmacen.AlmacenID ?? null,
      Egreso: productoAlmacen.Egreso ?? null,
      ProductoID: productoAlmacen.ProductoID ?? null,
    };
    Object.keys(partialProductoAlmacen).forEach(
      key =>
        partialProductoAlmacen[key] === null &&
        delete partialProductoAlmacen[key],
    );
    const categoriaLimpio = Variables.limpiarVariables(partialProductoAlmacen);

    return categoriaLimpio;
  }
}
