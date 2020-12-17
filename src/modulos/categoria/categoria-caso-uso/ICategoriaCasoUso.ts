import { Categoria } from '../entidades/categoria.entity';
import { CategoriaModel } from './models/categoria';

export interface ICategoriaCasoUso {
  obtenerPodId(CategoriaID: number): Promise<Categoria>;

  obtener(): Promise<Categoria[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(categoria: CategoriaModel, UsuarioID: number): Promise<boolean>;
  crear(categoria: CategoriaModel): Promise<Categoria>;
  eliminar(CategoriaID: number): Promise<boolean>;

  verificarNombre(nombre: string): Promise<Categoria>;

  verificarNombreEditar(
    nombre: string,
    CategoriaID: number,
  ): Promise<Categoria>;
}
