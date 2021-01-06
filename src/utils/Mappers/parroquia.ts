import { EditarParroquiaDto } from '@modulos/parroquia/api/dto';
import { ParroquiaModel } from '@modulos/parroquia/parroquia-caso-uso/models/parroquia';
import { Variables } from '@utils/manejo-variables/variables';

export class ParroquiaMapper {
  public static editar(parroquia: EditarParroquiaDto): ParroquiaModel {
    const partiaParroquia: EditarParroquiaDto = {
      Nombre: parroquia.Nombre ?? null,
      Canton: parroquia.Canton ?? null,
    };
    Object.keys(partiaParroquia).forEach(
      key => partiaParroquia[key] === null && delete partiaParroquia[key],
    );
    const parroquiaLimpio: ParroquiaModel = Variables.limpiarVariables(
      partiaParroquia,
    );

    return parroquiaLimpio;
  }

  public static crear(parroquia: EditarParroquiaDto): ParroquiaModel {
    const partiaParroquia: EditarParroquiaDto = {
      Nombre: parroquia.Nombre ?? null,
      Canton: parroquia.Canton ?? null,
    };
    Object.keys(partiaParroquia).forEach(
      key => partiaParroquia[key] === null && delete partiaParroquia[key],
    );
    const parroquiaLimpio: ParroquiaModel = Variables.limpiarVariables(
      partiaParroquia,
    );

    return parroquiaLimpio;
  }
}
