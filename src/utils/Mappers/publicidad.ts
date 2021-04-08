import { EditarPublicidadDto } from '@modulos/publicidad/api/dto';
import { PublicidadModel } from '@modulos/publicidad/publicidad-caso-uso/models/publicidad';
import { Variables } from '@utils/manejo-variables/variables';

export class PublicidadMapper {
  public static editar(publicidad: EditarPublicidadDto): PublicidadModel {
    const partiaPublicidad: EditarPublicidadDto = {
      Descripcion: publicidad.Descripcion ?? null,
    };
    Object.keys(partiaPublicidad).forEach(
      key => partiaPublicidad[key] === null && delete partiaPublicidad[key],
    );
    const publicidadLimpio: PublicidadModel = Variables.limpiarVariables(
      partiaPublicidad,
    );

    return publicidadLimpio;
  }

  public static crear(publicidad: EditarPublicidadDto): PublicidadModel {
    const partiaPublicidad: EditarPublicidadDto = {
      Descripcion: publicidad.Descripcion ?? null,
    };
    Object.keys(partiaPublicidad).forEach(
      key => partiaPublicidad[key] === null && delete partiaPublicidad[key],
    );
    const publicidadLimpio: PublicidadModel = Variables.limpiarVariables(
      partiaPublicidad,
    );

    return publicidadLimpio;
  }
}
