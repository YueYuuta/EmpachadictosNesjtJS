import { DespacharDetalle } from '../entidates/despachar-detalle.entity';
import { Despachar } from '../entidates/despachar.entity';
import { DespacharDetalleModel } from './models/despachar-detalle.model';
import { DespacharModel } from './models/despachar.model';

export interface IDespacharCasoUso {
  obtenerPodId(DespcharID: number): Promise<Despachar>;
  obtenerPodIdDespachar(DespcharID: number): Promise<Despachar>;
  obtenerTodos(AlmacenID: number): Promise<Despachar[]>;
  obtenerTodosPorPedidoIdYTipo(
    PedidoID: number,
    tipo: string,
  ): Promise<Despachar>;
  obtenerTodosDormidos(FechaPedido: string): Promise<Despachar[]>;
  obtenerTodosPorTipo(AlmacenID: number, tipo: string): Promise<Despachar[]>;
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
  editar(despachar: DespacharModel, DespacharID: number): Promise<Despachar>;
  crear(despchar: DespacharModel): Promise<Despachar>;
  eliminar(DespacharID: number): Promise<boolean>;
  eliminarDetalle(DespacharID: number): Promise<boolean>;
  obtenerPodIdTodo(DespcharID: number): Promise<Despachar>;
  cambiarEstadoDespachar(
    DespacharID: number,
    EstadoDespachar: boolean,
  ): Promise<boolean>;

  cambiarEstadoNotificacionDespachar(
    DespacharID: number,
    EstadoNorificacionDespachar: boolean,
  ): Promise<boolean>;
  cambiarEstadoNotificacionTipo(
    DespacharID: number,
    EstadoNotificacionTipo: boolean,
  ): Promise<boolean>;
  cambiarEstadoDespacharPrincipal(
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

  cambiarEstadoDormido(
    DespacharID: number,
    EstadoPedido: boolean,
  ): Promise<boolean>;
  obtenerTodoPorPedidoId(PedidoID: number): Promise<Despachar[]>;
  crearDetalle(detalleDespachar: DespacharDetalleModel): Promise<boolean>;
  obtenerdetallePorDespachar(DespacharID: number): Promise<DespacharDetalle[]>;
  eliminarDetalleDespachar(DespacharDetalleID: number): Promise<boolean>;
}
