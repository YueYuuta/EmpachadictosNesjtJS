import { Despachar } from '../entidates/despachar.entity';
import { DespacharModel } from './models/despachar.model';

export interface IDespacharCasoUso {
  obtenerPodId(DespcharID: number): Promise<Despachar>;
  obtenerTodos(AlmacenID: number): Promise<Despachar[]>;
  obtenerPaginado(
    desde: number,
    limite: number,
    AlmacenID: number,
  ): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
    AlmacenID: number,
  ): Promise<any>;
  editar(despachar: DespacharModel, DespacharID: number): Promise<boolean>;
  crear(despchar: DespacharModel): Promise<Despachar>;
  eliminar(DespacharID: number): Promise<boolean>;
  eliminarDetalle(DespacharID: number): Promise<boolean>;
  obtenerPodIdTodo(DespcharID: number): Promise<Despachar>;
  cambiarEstadoDespachar(
    DespacharID: number,
    EstadoDespachar: boolean,
  ): Promise<boolean>;
  cambiarEstadoDespacharDetalle(
    DespacharDetalleID: number,
    EstadoDespachar: boolean,
  ): Promise<boolean>;
  cambiarEstadoDespacharTipoDetalle(
    DespacharDetalleID: number,
    EstadoDespacharTipo: boolean,
  ): Promise<boolean>;
}