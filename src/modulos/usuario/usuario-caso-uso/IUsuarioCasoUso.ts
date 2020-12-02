import { Usuario } from '../entidates/usuario.entity';
import { UsuarioModel } from './models/usuario';
export interface IUsuarioCasoUso {
  obtenerPodId(UsuarioID: number): Promise<Usuario>;
  obtener(): Promise<Usuario[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  existeUsuarioCorreo(Correo: string): Promise<Usuario>;
  existeUsuario(Usuario: string): Promise<Usuario>;
  existeUsuarioCorreoEditar(
    Correo: string,
    UsuarioID: number,
  ): Promise<Usuario>;
  existeUsuarioEditar(Usuario: string, UsuarioID: number): Promise<Usuario>;
  editar(Usuaio: Partial<UsuarioModel>, UsuarioID: number): Promise<Usuario>;
  crear(Usuaio: UsuarioModel): Promise<Usuario>;
  eliminar(UsuarioID: number): Promise<boolean>;
  autoEliminar(UsuarioID: number, UsuarioLoginID: number): Promise<Usuario>;
}
