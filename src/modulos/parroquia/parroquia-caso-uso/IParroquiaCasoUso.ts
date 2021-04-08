import { Parroquia } from '../entidades/parroquia.entity';
import { ParroquiaModel } from './models/parroquia';

export interface IParroquiaCasoUso {
  obtenerPodId(ParroquiaID: number): Promise<Parroquia>;

  obtener(): Promise<Parroquia[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(parroquia: ParroquiaModel, UsuarioID: number): Promise<boolean>;
  crear(parroquia: ParroquiaModel): Promise<Parroquia>;
  eliminar(ParroquiaID: number): Promise<boolean>;

  verificarNombre(nombre: string): Promise<Parroquia>;

  verificarNombreEditar(
    nombre: string,
    ParroquiaID: number,
  ): Promise<Parroquia>;
}
