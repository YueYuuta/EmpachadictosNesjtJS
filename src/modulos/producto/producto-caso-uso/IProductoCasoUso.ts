import { Producto } from '../entidates/producto.entity';
import { ProductoModel } from './models/producto';

export interface IProductoCasoUso {
  obtenerPodId(ProductoID: number): Promise<Producto>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(
    producto: Partial<ProductoModel>,
    ProductoID: number,
  ): Promise<boolean>;
  crear(producto: ProductoModel): Promise<Producto>;
  eliminar(ProductoID: number): Promise<boolean>;

  eliminarDefinitivamente(ProductoID: number): Promise<boolean>;

  verificarDescripcion(descripcion: string): Promise<Producto>;

  verificarDescripcionEditar(
    descripcion: string,
    ProductoID: number,
  ): Promise<Producto>;

  obtenerPaginadoPorCategoria(
    desde: number,
    limite: number,
    CategoriaID: number,
  ): Promise<any>;
  obtenerPorBusquedaYCategoria(
    desde: number,
    limite: number,
    termino: string,
    CategoriaID: number,
  ): Promise<any>;

  obtenerProductoPorNombre(Descripcion: string): Promise<Producto[]>;
  obtenerProductoPorCodigoDeBarra(CodigoBarra: string): Promise<Producto>;
}
