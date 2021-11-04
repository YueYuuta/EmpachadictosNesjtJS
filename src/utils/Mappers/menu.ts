import { Variables } from '@utils/manejo-variables/variables';
import { EditarMenuDto } from '../../modulos/menu/api/dto/editar-menu.dto';
import { MenuModel } from '../../modulos/menu/menu-caso-uso/models/menu';

export class MenuMapper {
  public static editar(menu: EditarMenuDto): MenuModel {
    const partiaMenu: EditarMenuDto = {
      CategoriaID: menu.CategoriaID ?? null,
      Descripcion: menu.Descripcion ?? null,
      Detalle: menu.Detalle ?? null,
      EstadoIva: menu.EstadoIva ?? null,
      EstadoPrecioVentaDinamico: menu.EstadoPrecioVentaDinamico ?? null,
      PrecioVenta: menu.PrecioVenta ?? null,
    };
    Object.keys(partiaMenu).forEach(
      key => partiaMenu[key] === null && delete partiaMenu[key],
    );
    const menuLimpio: MenuModel = Variables.limpiarVariables(partiaMenu);

    return menuLimpio;
  }

  public static crear(menu: EditarMenuDto): MenuModel {
    const partiaMenu: EditarMenuDto = {
      CategoriaID: menu.CategoriaID ?? null,
      Descripcion: menu.Descripcion ?? null,
      Detalle: menu.Detalle ?? null,
      EstadoIva: menu.EstadoIva ?? null,
      EstadoPrecioVentaDinamico: menu.EstadoPrecioVentaDinamico ?? null,
      PrecioVenta: menu.PrecioVenta ?? null,
    };
    Object.keys(partiaMenu).forEach(
      key => partiaMenu[key] === null && delete partiaMenu[key],
    );
    const menuLimpio: MenuModel = Variables.limpiarVariables(partiaMenu);

    return menuLimpio;
  }
}
