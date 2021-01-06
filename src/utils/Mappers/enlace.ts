import { EditarEnlaceDto } from '@modulos/enlace/api/dto';
import { EnlaceModel } from '@modulos/enlace/enlace-caso-uso/models/enlace';
import { Variables } from '@utils/manejo-variables/variables';

export class EnlaceMapper {
  public static editar(enlace: EditarEnlaceDto): EnlaceModel {
    const partiaEnlace: EditarEnlaceDto = {
      Descripcion: enlace.Descripcion ?? null,
      Plan: enlace.Plan ?? null,
      Precio: enlace.Precio ?? null,
      VelocidadBajada: enlace.VelocidadBajada ?? null,
      VelocidadSubida: enlace.VelocidadSubida ?? null,
    };
    Object.keys(partiaEnlace).forEach(
      key => partiaEnlace[key] === null && delete partiaEnlace[key],
    );
    const enlaceLimpio: EnlaceModel = Variables.limpiarVariables(partiaEnlace);

    return enlaceLimpio;
  }

  public static crear(enlace: EditarEnlaceDto): EnlaceModel {
    const partiaEnlace: EditarEnlaceDto = {
      Descripcion: enlace.Descripcion ?? null,
      Plan: enlace.Plan ?? null,
      Precio: enlace.Precio ?? null,
      VelocidadBajada: enlace.VelocidadBajada ?? null,
      VelocidadSubida: enlace.VelocidadSubida ?? null,
    };
    Object.keys(partiaEnlace).forEach(
      key => partiaEnlace[key] === null && delete partiaEnlace[key],
    );
    const enlaceLimpio: EnlaceModel = Variables.limpiarVariables(partiaEnlace);

    return enlaceLimpio;
  }
}
