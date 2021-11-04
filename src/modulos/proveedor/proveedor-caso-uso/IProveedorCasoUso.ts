import { Proveedor } from '../entidates/proveedor.entity';
import { ProveedorModel } from './models/proveedor';

export interface IProveedorCasoUso {
  obtenerPodId(ProveedorID: number): Promise<Proveedor>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(
    proveedor: Partial<ProveedorModel>,
    UsuarioID: number,
  ): Promise<boolean>;
  crear(proveedor: Partial<ProveedorModel>): Promise<Proveedor>;
  eliminar(ProveedorID: number): Promise<boolean>;
  verificarRuc(ruc: string): Promise<Proveedor>;
  verificarRucEditar(ruc: string, ProveedorID: number): Promise<Proveedor>;
}
