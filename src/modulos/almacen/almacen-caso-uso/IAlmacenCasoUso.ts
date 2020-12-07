import { Almacen } from '../entidates/almacen.entity';
import { AlmacenModel } from './models/almacen';

export interface IAlmacenCasoUso {
  obtenerPodId(UsuarioID: number): Promise<Almacen>;
  obtener(): Promise<Almacen[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(almacen: Partial<AlmacenModel>, UsuarioID: number): Promise<Almacen>;
  crear(almacen: AlmacenModel): Promise<Almacen>;
  eliminar(AlmacenID: number): Promise<boolean>;
}
