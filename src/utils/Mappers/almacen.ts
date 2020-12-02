import { EditarAlmacenDto } from '@modulos/almacen/api/dto/editar-almacen.dto';
import { Variables } from '@utils/manejo-variables/variables';
import { AlmacenModel } from '@modulos/almacen/almacen-caso-uso/models/almacen';

export class AlmacenMapper {
  public static editar(almacen: EditarAlmacenDto): Partial<AlmacenModel> {
    const partiaAlmacen: Partial<EditarAlmacenDto> = {
      Direccion: almacen.Direccion ?? null,
      Correo: almacen.Correo ?? null,
      NombreComercial: almacen.NombreComercial ?? null,
      RazonSocial: almacen.RazonSocial ?? null,
      Ruc: almacen.Ruc ?? null,
      Telefono: almacen.Telefono ?? null,
    };
    Object.keys(partiaAlmacen).forEach(
      key => partiaAlmacen[key] === null && delete partiaAlmacen[key],
    );
    const usuarioLimpio: Partial<AlmacenModel> = Variables.limpiarVariables(
      partiaAlmacen,
    );

    return usuarioLimpio;
  }
}
