import { Publicidad } from '../entidades/publicidad.entity';
import { PublicidadModel } from './models/publicidad';

export interface IPublicidadCasoUso {
  obtenerPodId(PublicidadID: number): Promise<Publicidad>;

  obtener(): Promise<Publicidad[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(publicidad: PublicidadModel, UsuarioID: number): Promise<boolean>;
  crear(publicidad: PublicidadModel): Promise<Publicidad>;
  eliminar(PublicidadID: number): Promise<boolean>;

  verificarNombre(nombre: string): Promise<Publicidad>;

  verificarNombreEditar(
    nombre: string,
    PublicidadID: number,
  ): Promise<Publicidad>;
}
