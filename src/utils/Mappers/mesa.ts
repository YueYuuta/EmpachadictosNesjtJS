import { CrearMesaDto, EditarMesaDto } from '@modulos/mesa/api/dto';
import { MesaModel } from '@modulos/mesa/mesa-caso-uso/models/mesa';
import { Variables } from '@utils/manejo-variables/variables';

export class MesaMapper {
  public static editar(mesa: EditarMesaDto): MesaModel {
    const partiaMesa: EditarMesaDto = {
      Descripcion: mesa.Descripcion ?? null,
    };
    Object.keys(partiaMesa).forEach(
      key => partiaMesa[key] === null && delete partiaMesa[key],
    );
    const mesaLimpio: MesaModel = Variables.limpiarVariables(partiaMesa);

    return mesaLimpio;
  }

  public static crear(mesa: CrearMesaDto): MesaModel {
    const partiaMesa: CrearMesaDto = {
      Descripcion: mesa.Descripcion ?? null,
      AlmacenID: mesa.AlmacenID ?? null,
    };
    Object.keys(partiaMesa).forEach(
      key => partiaMesa[key] === null && delete partiaMesa[key],
    );
    const mesaLimpio: MesaModel = Variables.limpiarVariables(partiaMesa);

    return mesaLimpio;
  }
}
