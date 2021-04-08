import { Enlace } from '../entidades/enlace.entity';
import { EnlaceModel } from './models/enlace';

export interface IEnlaceCasoUso {
  obtenerPodId(EnlaceID: number): Promise<Enlace>;

  obtener(): Promise<Enlace[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(enlace: EnlaceModel, UsuarioID: number): Promise<boolean>;
  crear(enlace: EnlaceModel): Promise<Enlace>;
  eliminar(EnlaceID: number): Promise<boolean>;

  verificarNombre(descripcion: string): Promise<Enlace>;

  verificarNombreEditar(descripcion: string, EnlaceID: number): Promise<Enlace>;
}
