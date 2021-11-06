import { IngresoDetalleModel } from './ingreso-detalle.model';

export class IngresoDetalleEditarModel {
  Editar: IngresoDetalleModel[];
  Crear: IngresoDetalleModel[];
  Eliminar: IngresoDetalleEliminarModel[];
}

export class IngresoDetalleEliminarModel {
  IngresoDetalleID: number;
}
