import { IngresoDetalle } from '../entidates/ingreso-detalle.entity';
import { Ingreso } from '../entidates/ingreso.entity';
import { IngresoDetalleModel } from './models/ingreso-detalle.model';
import { IngresoModel } from './models/ingreso.model';
export interface IIngresoCasoUso {
  obtenerPorId(IngresoID: number): Promise<Ingreso>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(ingreso: any, IngresoID: number): Promise<boolean>;
  crear(ingreso: IngresoModel): Promise<Ingreso>;
  eliminar(IngresoID: number): Promise<boolean>;
  editarDetalle(ingresoDetalle: IngresoDetalleModel): Promise<boolean>;
  eliminarDetalle(IngresoDetalleID: number): Promise<boolean>;
  eliminarDetalleTodo(IngresoID: number): Promise<boolean>;
  eliminarDetalleDefinitivo(IngresiDetalleID: number): Promise<boolean>;
  crearDetalle(IngresoDetalle: IngresoDetalleModel): Promise<IngresoDetalle>;
  obtenerDetallePorID(IngresoDetalleID: number): Promise<IngresoDetalle>;
  obtenerDetallePorIngresoID(IngresoID: number): Promise<IngresoDetalle[]>;
}
