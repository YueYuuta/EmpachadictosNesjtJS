import { Antiguo } from '../entidades/antiguo.entity';
import { AntiguoModel } from './models/antiguo';

export interface IAntiguoCasoUso {
  obtenerPodId(AntiguoID: number): Promise<Antiguo>;

  obtener(): Promise<Antiguo[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;
  editar(antiguo: AntiguoModel, UsuarioID: number): Promise<boolean>;
  crear(antiguo: AntiguoModel): Promise<Antiguo>;
  eliminar(AntiguoID: number): Promise<boolean>;

  verificarNombre(descripcion: string): Promise<Antiguo>;

  verificarNombreEditar(
    descripcion: string,
    AntiguoID: number,
  ): Promise<Antiguo>;
}
