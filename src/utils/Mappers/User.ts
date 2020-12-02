import { UsuarioModel } from '@modulos/usuario/usuario-caso-uso/models/usuario';
import { EditarUsuarioDto } from '@modulos/usuario/api/dto/editar-usuario.dto';
import { UsuarioDetalleModel } from '@modulos/usuario/usuario-caso-uso/models/usuario-detalle';
import { CrearUsuarioDto } from '@modulos/usuario/api/dto/crear-usuario.dto';
import { Variables } from '../manejo-variables/variables';

export class UserMapper {
  public static editar(usuario: EditarUsuarioDto): Partial<UsuarioModel> {
    const usuarioDetalle: Partial<UsuarioDetalleModel> = {
      Apellidos: usuario.Apellidos ?? null,
      Nombres: usuario.Nombres ?? null,
    };

    Object.keys(usuarioDetalle).forEach(
      key => usuarioDetalle[key] === null && delete usuarioDetalle[key],
    );
    const partialUser: Partial<UsuarioModel> = {
      Usuario: usuario.Usuario ?? null,
      Correo: usuario.Correo ?? null,
      Rol: usuario.Rol ?? null,
      Detalle: usuarioDetalle ?? null,
    };
    Object.keys(partialUser).forEach(
      key => partialUser[key] === null && delete partialUser[key],
    );

    const usuarioLimpio: Partial<UsuarioModel> = Variables.limpiarVariables(
      partialUser,
    );

    return usuarioLimpio;
  }

  public static crear(usuario: CrearUsuarioDto): UsuarioModel {
    const usuarioDetalle: UsuarioDetalleModel = {
      Apellidos: usuario.Apellidos ?? null,
      Nombres: usuario.Nombres ?? null,
    };

    Object.keys(usuarioDetalle).forEach(
      key => usuarioDetalle[key] === null && delete usuarioDetalle[key],
    );
    const partialUser: UsuarioModel = {
      Usuario: usuario.Usuario ?? null,
      Correo: usuario.Correo ?? null,
      Contraseña: usuario.Contraseña ?? null,
      Rol: usuario.Rol ?? null,
      Detalle: usuarioDetalle ?? null,
    };
    Object.keys(partialUser).forEach(
      key => partialUser[key] === null && delete partialUser[key],
    );
    const usuarioLimpio = Variables.limpiarVariables(partialUser);

    return usuarioLimpio;
  }
}
