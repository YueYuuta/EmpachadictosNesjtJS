import { EditarUsuarioAlmacenDto } from '@modulos/usuario-almacen/api/dto';
import { Variables } from '@utils/manejo-variables/variables';
import { UsuarioAlmacenModel } from '@modulos/usuario-almacen/usuario-almacen-caso-uso/models/usuario-almacen';

export class UsuarioAlmacenMapper {
  public static editar(
    usuarioAlmacen: EditarUsuarioAlmacenDto,
  ): Partial<UsuarioAlmacenModel> {
    const partiaUAlmacen: Partial<EditarUsuarioAlmacenDto> = {
      Almacen: usuarioAlmacen.Almacen ?? null,
      Usuario: usuarioAlmacen.Usuario ?? null,
    };
    Object.keys(partiaUAlmacen).forEach(
      key => partiaUAlmacen[key] === null && delete partiaUAlmacen[key],
    );
    const usuarioLimpio: Partial<UsuarioAlmacenModel> = Variables.limpiarVariables(
      partiaUAlmacen,
    );

    return usuarioLimpio;
  }
}
