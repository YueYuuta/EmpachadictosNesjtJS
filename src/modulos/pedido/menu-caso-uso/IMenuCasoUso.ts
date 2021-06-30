import { Menu } from '../entidates/menu.entity';
import { MenuModel } from './models/menu';

export interface IMenuCasoUso {
  obtenerPodId(MenuID: number): Promise<Menu>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(menu: MenuModel, MenuID: number): Promise<boolean>;
  crear(menu: MenuModel): Promise<Menu>;
  eliminar(MenuID: number): Promise<boolean>;

  verificarDescripcion(descripcion: string): Promise<Menu>;

  eliminarDefinitivamente(ProductoID: number): Promise<boolean>;

  verificarDescripcionEditar(
    descripcion: string,
    MenuID: number,
  ): Promise<Menu>;

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
}
