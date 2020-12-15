import { Usuario } from '@modulos/usuario/entidates/usuario.entity';
export interface IAuthCasoUso {
  obtenerPorId(UsuarioID: number): Promise<Usuario>;
  existeUsuario(Usuario: string): Promise<Usuario>;
  crearToken(usuario: Usuario): Promise<string>;
}
