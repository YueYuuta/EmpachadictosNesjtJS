import { Provincia } from '../entidades/provincia.entity';
import { ProvinciaModel } from './models/provincia';

export interface IProvinciaCasoUso {
  obtenerPodId(ProvinciaID: number): Promise<Provincia>;

  obtener(): Promise<Provincia[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(provincia: ProvinciaModel, UsuarioID: number): Promise<boolean>;
  crear(provincia: ProvinciaModel): Promise<Provincia>;
  eliminar(ProvinciaID: number): Promise<boolean>;

  verificarNombre(nombre: string): Promise<Provincia>;

  verificarNombreEditar(
    nombre: string,
    ProvinciaID: number,
  ): Promise<Provincia>;
}
