import { EditarCantonDto } from '@modulos/canton/api/dto';
import { CantonModel } from '@modulos/canton/canton-caso-uso/models/canton';
import { Variables } from '@utils/manejo-variables/variables';

export class CantonMapper {
  public static editar(canton: EditarCantonDto): CantonModel {
    const partiaCanton: EditarCantonDto = {
      Nombre: canton.Nombre ?? null,
      Provincia: canton.Provincia ?? null,
    };
    Object.keys(partiaCanton).forEach(
      key => partiaCanton[key] === null && delete partiaCanton[key],
    );
    const cantonLimpio: CantonModel = Variables.limpiarVariables(partiaCanton);

    return cantonLimpio;
  }

  public static crear(canton: EditarCantonDto): CantonModel {
    const partiaCanton: EditarCantonDto = {
      Nombre: canton.Nombre ?? null,
      Provincia: canton.Provincia ?? null,
    };
    Object.keys(partiaCanton).forEach(
      key => partiaCanton[key] === null && delete partiaCanton[key],
    );
    const cantonLimpio: CantonModel = Variables.limpiarVariables(partiaCanton);

    return cantonLimpio;
  }
}
