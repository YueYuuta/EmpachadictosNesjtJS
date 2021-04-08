import { EditarAntiguoDto } from '@modulos/antiguo/api/dto';
import { AntiguoModel } from '@modulos/antiguo/antiguo-caso-uso/models/antiguo';
import { Variables } from '@utils/manejo-variables/variables';

export class AntiguoMapper {
  public static editar(antiguo: EditarAntiguoDto): AntiguoModel {
    const partiaAntiguo: EditarAntiguoDto = {
      Descripcion: antiguo.Descripcion ?? null,
    };
    Object.keys(partiaAntiguo).forEach(
      key => partiaAntiguo[key] === null && delete partiaAntiguo[key],
    );
    const antiguoLimpio: AntiguoModel = Variables.limpiarVariables(
      partiaAntiguo,
    );

    return antiguoLimpio;
  }

  public static crear(antiguo: EditarAntiguoDto): AntiguoModel {
    const partiaAntiguo: EditarAntiguoDto = {
      Descripcion: antiguo.Descripcion ?? null,
    };
    Object.keys(partiaAntiguo).forEach(
      key => partiaAntiguo[key] === null && delete partiaAntiguo[key],
    );
    const antiguoLimpio: AntiguoModel = Variables.limpiarVariables(
      partiaAntiguo,
    );

    return antiguoLimpio;
  }
}
