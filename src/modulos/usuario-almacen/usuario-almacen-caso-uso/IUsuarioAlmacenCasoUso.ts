import { UsuarioAlmacen } from '../entidates/usuario-almacen.entity';
import { EditarUsuarioAlmacenDto } from '../api/dto/editar-usuario-almacen.dto';
import { UsuarioAlmacenModel } from '@modulos/usuario-almacen/usuario-almacen-caso-uso/models/usuario-almacen';

export interface IUsuarioAlmacenCasoUso {
  obtenerPodId(UsuarioAlmacenID: number): Promise<UsuarioAlmacen>;
  obtener(): Promise<UsuarioAlmacen[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorUsuario(UsuarioID: number): Promise<UsuarioAlmacen[]>;
  obtenerPorAlmacen(AlmacenID: number): Promise<UsuarioAlmacen[]>;
  obtenerPorBusqueda(termino: string): Promise<any>;
  editar(
    almacen: Partial<EditarUsuarioAlmacenDto>,
    UsuarioID: number,
  ): Promise<UsuarioAlmacen>;
  crear(usuarioAlmacen: UsuarioAlmacenModel): Promise<UsuarioAlmacen>;
  eliminar(UsuarioAlmacenID: number): Promise<boolean>;
  validarExiste(UsuarioID: number, ALmacenID: number): Promise<UsuarioAlmacen>;
  validarExisteEditar(
    UsuarioAlmacenID: number,
    UsuarioID: number,
    ALmacenID: number,
  ): Promise<UsuarioAlmacen>;
}
