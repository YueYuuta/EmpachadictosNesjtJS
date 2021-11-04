import { Ingreso } from '../entidates/ingreso.entity';
import { IngresoModel } from './models/ingreso.model';
export interface IIngresoCasoUso {
  obtenerPorId(IngresoID: number): Promise<Ingreso>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(ingreso: IngresoModel, MenuID: number): Promise<boolean>;
  crear(ingreso: IngresoModel): Promise<Ingreso>;
  eliminar(IngresoID: number): Promise<boolean>;
}
