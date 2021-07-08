import {
  CrearMenuAlmacenEgresoDto,
  CrearMenuAlmacenIngresoDto,
} from '@modulos/menu-almacen/api/dto';
import {
  CrearMenuAlmacenEgresoModel,
  CrearMenuAlmacenIngresoModel,
} from '@modulos/menu-almacen/menu-almacen-caso-uso/models/menu-almacen';
import { Variables } from '@utils/manejo-variables/variables';

export class MenuAlmacenMapper {
  public static crearIngreso(
    menuAlmacen: CrearMenuAlmacenIngresoDto,
  ): CrearMenuAlmacenIngresoModel {
    const partialMenuAlmacen: CrearMenuAlmacenIngresoDto = {
      AlmacenID: menuAlmacen.AlmacenID ?? null,
      Ingreso: menuAlmacen.Ingreso ?? null,
      MenuID: menuAlmacen.MenuID ?? null,
    };
    Object.keys(partialMenuAlmacen).forEach(
      key => partialMenuAlmacen[key] === null && delete partialMenuAlmacen[key],
    );
    const categoriaLimpio = Variables.limpiarVariables(partialMenuAlmacen);

    return categoriaLimpio;
  }

  public static crearEgreso(
    menuAlmacen: CrearMenuAlmacenEgresoDto,
  ): CrearMenuAlmacenEgresoModel {
    const partialMenuAlmacen: CrearMenuAlmacenEgresoDto = {
      AlmacenID: menuAlmacen.AlmacenID ?? null,
      Egreso: menuAlmacen.Egreso ?? null,
      MenuID: menuAlmacen.MenuID ?? null,
    };
    Object.keys(partialMenuAlmacen).forEach(
      key => partialMenuAlmacen[key] === null && delete partialMenuAlmacen[key],
    );
    const categoriaLimpio = Variables.limpiarVariables(partialMenuAlmacen);

    return categoriaLimpio;
  }
}
