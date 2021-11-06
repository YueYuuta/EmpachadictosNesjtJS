import { IngresoDetalleDto } from './ingreso-detalle.dto';

export class IngresoDetalleEditarDto {
  Editar: IngresoDetalleDto[];
  Crear: IngresoDetalleDto[];
  Eliminar: IngresoDetalleEliminarModel[];
}

export class IngresoDetalleEliminarModel {
  IngresoDetalleID: number;
}
