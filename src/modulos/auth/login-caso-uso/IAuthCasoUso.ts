import { Usuario } from '@modulos/usuario/entidates/usuario.entity';
export interface IAuthCasoUso {
  obtenerPodId(UsuarioID: number): Promise<Usuario>;
  existeUsuario(Usuario: string): Promise<Usuario>;
  crearToken(usuario: Usuario): Promise<string>;
}
