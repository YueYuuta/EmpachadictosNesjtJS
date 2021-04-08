import { Termino } from '../entidades/termino.entity';
import { TerminoModel } from './models/termino';

export interface ITerminoCasoUso {
  obtenerPodId(TerminoID: number): Promise<Termino>;

  obtener(): Promise<Termino[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(termino: TerminoModel, UsuarioID: number): Promise<boolean>;
  crear(termino: TerminoModel): Promise<Termino>;
  eliminar(TerminoID: number): Promise<boolean>;

  verificarNombre(nombre: string): Promise<Termino>;

  verificarNombreEditar(nombre: string, TerminoID: number): Promise<Termino>;
}
