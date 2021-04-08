import { Canton } from '../entidades/canton.entity';
import { CantonModel } from './models/canton';

export interface ICantonCasoUso {
  obtenerPodId(CantonID: number): Promise<Canton>;

  obtener(): Promise<Canton[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(canton: CantonModel, UsuarioID: number): Promise<boolean>;
  crear(canton: CantonModel): Promise<Canton>;
  eliminar(CantonID: number): Promise<boolean>;

  verificarNombre(nombre: string): Promise<Canton>;

  verificarNombreEditar(nombre: string, CantonID: number): Promise<Canton>;
}
