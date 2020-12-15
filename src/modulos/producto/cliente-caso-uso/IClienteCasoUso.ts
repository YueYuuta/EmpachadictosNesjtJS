import { Cliente } from '../entidates/producto.entity';
import { ClienteModel } from './models/cliente';

export interface IClienteCasoUso {
  obtenerPodId(ClienteID: number): Promise<Cliente>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(cliente: Partial<ClienteModel>, UsuarioID: number): Promise<boolean>;
  crear(cliente: Partial<ClienteModel>): Promise<Cliente>;
  eliminar(ClienteID: number): Promise<boolean>;

  verificarRuc(ruc: string): Promise<Cliente>;
  verificarCedula(cedula: string): Promise<Cliente>;
  verificarOtro(otro: string): Promise<Cliente>;

  verificarRucEditar(ruc: string, ClienteID: number): Promise<Cliente>;
  verificarCedulaEditar(cedula: string, ClienteID: number): Promise<Cliente>;
  verificarOtroEditar(otro: string, ClienteID: number): Promise<Cliente>;
}
