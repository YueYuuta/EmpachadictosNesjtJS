import { EditarTerminoDto } from '@modulos/termino/api/dto';
import { TerminoModel } from '@modulos/termino/termino-caso-uso/models/termino';
import { Variables } from '@utils/manejo-variables/variables';

export class TerminoMapper {
  public static editar(termino: EditarTerminoDto): TerminoModel {
    const partiaTermino: EditarTerminoDto = {
      Descripcion: termino.Descripcion ?? null,
      Dias: termino.Dias ?? null,
    };
    Object.keys(partiaTermino).forEach(
      key => partiaTermino[key] === null && delete partiaTermino[key],
    );
    const terminoLimpio: TerminoModel = Variables.limpiarVariables(
      partiaTermino,
    );

    return terminoLimpio;
  }

  public static crear(termino: EditarTerminoDto): TerminoModel {
    const partiaTermino: EditarTerminoDto = {
      Descripcion: termino.Descripcion ?? null,
      Dias: termino.Dias ?? null,
    };
    Object.keys(partiaTermino).forEach(
      key => partiaTermino[key] === null && delete partiaTermino[key],
    );
    const terminoLimpio: TerminoModel = Variables.limpiarVariables(
      partiaTermino,
    );

    return terminoLimpio;
  }
}
