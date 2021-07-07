import { CambiarMesaDto } from '../api/dto/cambiar-mesa.dto';
import { Mesa } from '../entidades/mesa.entity';
import { MesaModel } from './models/mesa';

export interface IMesaCasoUso {
  obtenerPodId(MesaID: number): Promise<Mesa>;

  obtener(AlmacenID: number): Promise<Mesa[]>;
  obtenerPaginado(
    desde: number,
    limite: number,
    AlmacenID: number,
  ): Promise<any>;
  obtenerPorBusqueda(
    desde: number,
    limite: number,
    termino: string,
    AlmacenID: number,
  ): Promise<any>;
  editar(mesa: MesaModel, UsuarioID: number): Promise<boolean>;
  crear(mesa: MesaModel): Promise<Mesa>;
  eliminar(MesaID: number): Promise<boolean>;

  verificarNombre(descripcion: string, AlmacenID: number): Promise<Mesa>;

  verificarNombreEditar(
    descripcion: string,
    MesaID: number,
    ALmacenID: number,
  ): Promise<Mesa>;

  ocuparMesa(ocuparMesa: CambiarMesaDto, MesaID: number): Promise<boolean>;
}
