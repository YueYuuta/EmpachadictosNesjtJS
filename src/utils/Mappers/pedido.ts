import { CrearPedidoDto, EditarPedidoDto } from '@modulos/pedido/api/dto';
import { PedidoModel } from '@modulos/pedido/pedido-caso-uso/models/pedido.model';
import { Variables } from '@utils/manejo-variables/variables';

export class PedidoMapper {
  public static editar(pedido: EditarPedidoDto): PedidoModel {
    const partiaPedido: EditarPedidoDto = {
      ClienteID: pedido.ClienteID ?? null,
      Detalle: pedido.Detalle ?? null,
      Observacion: pedido.Observacion ?? null,
      TipoFactura: pedido.TipoFactura ?? null,
      TipoPago: pedido.TipoPago ?? null,
    };
    Object.keys(partiaPedido).forEach(
      key => partiaPedido[key] === null && delete partiaPedido[key],
    );
    const menuLimpio: PedidoModel = Variables.limpiarVariables(partiaPedido);

    return menuLimpio;
  }

  public static crear(pedido: CrearPedidoDto, UsuarioID: number): PedidoModel {
    const partiaPedido: CrearPedidoDto = {
      MesaID: pedido.MesaID ?? null,
      AlmacenID: pedido.AlmacenID ?? null,
      ClienteID: pedido.ClienteID ?? null,
      Detalle: pedido.Detalle ?? null,
      Observacion: pedido.Observacion ?? null,
      TipoFactura: pedido.TipoFactura ?? null,
      TipoPago: pedido.TipoPago ?? null,
      UsuarioID: UsuarioID ?? null,
    };
    Object.keys(partiaPedido).forEach(
      key => partiaPedido[key] === null && delete partiaPedido[key],
    );
    const menuLimpio: PedidoModel = Variables.limpiarVariables(partiaPedido);

    return menuLimpio;
  }
}
