import { EditarProvinciaDto } from '@modulos/provincia/api/dto';
import { ProvinciaModel } from '@modulos/provincia/provincia-caso-uso/models/provincia';
import { Variables } from '@utils/manejo-variables/variables';

export class ProvinciaMapper {
  public static editar(provincia: EditarProvinciaDto): ProvinciaModel {
    const partiaProvincia: EditarProvinciaDto = {
      Nombre: provincia.Nombre ?? null,
    };
    Object.keys(partiaProvincia).forEach(
      key => partiaProvincia[key] === null && delete partiaProvincia[key],
    );
    const provinciaLimpio: ProvinciaModel = Variables.limpiarVariables(
      partiaProvincia,
    );

    return provinciaLimpio;
  }

  public static crear(provincia: EditarProvinciaDto): ProvinciaModel {
    const partiaProvincia: EditarProvinciaDto = {
      Nombre: provincia.Nombre ?? null,
    };
    Object.keys(partiaProvincia).forEach(
      key => partiaProvincia[key] === null && delete partiaProvincia[key],
    );
    const provinciaLimpio: ProvinciaModel = Variables.limpiarVariables(
      partiaProvincia,
    );

    return provinciaLimpio;
  }
}
