import { ProductoAlmacenDetalle } from '../entidates/producto-almacen-detalle.entity';
import { ProductoAlmacen } from '../entidates/producto-almacen.entity';
import {
  CrearProductoAlmacenIngresoDetalleModel,
  CrearProductoAlmacenIngresoModel,
} from './models/producto-almacen';

export interface IProductoAlmacenCasoUso {
  obtenerPorId(ProductoAlmacenID: number): Promise<ProductoAlmacen>;
  obtenerDetallePorIngresoDetalleID(
    IngresoDetalleID: number,
  ): Promise<ProductoAlmacenDetalle>;
  ExisteProductoEnELAlmacen(
    AlmacenID: number,
    ProductoID: number,
  ): Promise<ProductoAlmacen>;
  obtenerPaginado(
    desde: number,
    limite: number,
    AlmacenID: number,
  ): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
    AlmacenID: number,
  ): Promise<any>;
  crear(ingreso: CrearProductoAlmacenIngresoModel): Promise<ProductoAlmacen>;
  eliminar(ProductoAlmacenID: number): Promise<boolean>;

  obtenerProductoPorNombre(
    Descripcion: string,
    AlmacenID: number,
  ): Promise<ProductoAlmacen[]>;
  obtenerProductoPorCodigoDeBarra(
    CodigoBarra: string,
    AlmacenID: number,
  ): Promise<ProductoAlmacen>;

  obtenerPaginadoPorCategoria(
    desde: number,
    limite: number,
    CategoriaID: number,
    AlmacenID: number,
  ): Promise<any>;
  obtenerPorBusquedaYCategoria(
    desde: number,
    limite: number,
    termino: string,
    CategoriaID: number,
    AlmacenID: number,
  ): Promise<any>;

  cambioIngreso(
    ingreso: number,
    ProductoAlmacenDetalleID: number,
  ): Promise<boolean>;
  cambioEgreso(
    egreso: number,
    ProductoAlmacenDetalleID: number,
  ): Promise<boolean>;

  crearDetalle(
    detalle: CrearProductoAlmacenIngresoDetalleModel,
  ): Promise<boolean>;

  obtenerDetalleTodo(
    ProductoAlmacenID: number,
  ): Promise<ProductoAlmacenDetalle[]>;

  obtenerDetalle(ProductoAlmacenID: number): Promise<ProductoAlmacenDetalle[]>;

  cambiarEstadoStockDetalle(
    ProductoAlmacenDetalleID: number,
    EstadoStock: boolean,
  ): Promise<boolean>;

  cambiarEstadoDetalle(
    IngresoDetalleID: number,
    Estado: boolean,
  ): Promise<boolean>;
}
