import { Plan } from '../entidades/plan.entity';
import { PlanModel } from './models/plan';

export interface IPlanCasoUso {
  obtenerPodId(PlanID: number): Promise<Plan>;

  obtener(): Promise<Plan[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(plan: PlanModel, UsuarioID: number): Promise<boolean>;
  crear(plan: PlanModel): Promise<Plan>;
  eliminar(PlanID: number): Promise<boolean>;

  verificarNombre(descripcion: string): Promise<Plan>;

  verificarNombreEditar(descripcion: string, PlanID: number): Promise<Plan>;
}
