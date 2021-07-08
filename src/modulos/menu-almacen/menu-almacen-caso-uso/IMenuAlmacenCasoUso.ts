import { MenuAlmacen } from '../entidates/menu-almacen.entity';
import { CrearMenuAlmacenIngresoModel } from './models/menu-almacen';

export interface IMenuAlmacenCasoUso {
  obtenerPodId(MenuAlmacenID: number): Promise<MenuAlmacen>;
  ExisteMenuEnELAlmacen(
    AlmacenID: number,
    MenuID: number,
  ): Promise<MenuAlmacen>;
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
  crear(ingreso: CrearMenuAlmacenIngresoModel): Promise<boolean>;
  eliminar(MenuAlmacenID: number): Promise<boolean>;

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

  cambioIngreso(ingreso: number, MenuAlmacenID: number): Promise<boolean>;
  cambioEgreso(egreso: number, MenuAlmacenID: number): Promise<boolean>;
}
