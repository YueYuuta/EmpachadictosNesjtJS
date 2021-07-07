import { Pedido } from '../entidates/pedido.entity';
import { PedidoModel } from './models/pedido.model';
export interface IPedidoCasoUso {
  obtenerPodId(PedidoID: number): Promise<Pedido>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(pedido: PedidoModel, MenuID: number): Promise<boolean>;
  crear(pedido: PedidoModel): Promise<Pedido>;
  eliminar(PedidoID: number): Promise<boolean>;
  cambiarMesa(MesaID: number, PedidoID: number): Promise<boolean>;
}
