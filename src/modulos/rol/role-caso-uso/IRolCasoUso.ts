import { Rol } from '../entidades/rol.entity';
import { RolModel } from './models/rol';
import { Permiso } from '../entidades/permiso.entity';
import { RolPermiso } from '../entidades/rol-permiso.entity';

export interface IRolCasoUso {
  obtenerPodId(RolID: number): Promise<Rol>;
  obtenerRoles(): Promise<Rol[]>;
  obtenerPaginado(desde: number, limite: number): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
  ): Promise<any>;

  editar(RolID: number, rol: RolModel): Promise<boolean>;
  obtenerPermisos(): Promise<Permiso[]>;
  crear(rol: RolModel): Promise<Rol>;
  obtenerPermisoPorId(PermisoID: number): Promise<Permiso>;
  nombreRolExiste(nombre: string): Promise<Rol>;
  nombreRolExisteEditar(RolID: number, nombre: string): Promise<Rol>;
  eliminar(RolID: number): Promise<boolean>;
  obtenerPermisosPorRole(RolID: number): Promise<RolPermiso[]>;
}
