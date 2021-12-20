import { Variables } from '@utils/manejo-variables/variables';
import { EditarProveedorDto } from '@modulos/proveedor/api/dto/editar-proveedor.dto';
import { ProveedorModel } from '../../modulos/proveedor/proveedor-caso-uso/models/proveedor';
import { CrearProveedorDto } from '../../modulos/proveedor/api/dto/crear-proveedor.dto';

export class ProveedorMapper {
  public static editar(proveedor: EditarProveedorDto): Partial<ProveedorModel> {
    const partiaAlmacen: Partial<EditarProveedorDto> = {
      Correo: proveedor.Correo ?? null,
      Ruc: proveedor.Ruc ?? null,
      Telefono: proveedor.Telefono ?? null,
      Direccion: proveedor.Direccion ?? null,
      Nombre: proveedor.Nombre ?? null,
    };
    Object.keys(partiaAlmacen).forEach(
      key => partiaAlmacen[key] === null && delete partiaAlmacen[key],
    );
    const usuarioLimpio: Partial<ProveedorModel> = Variables.limpiarVariables(
      partiaAlmacen,
    );

    return usuarioLimpio;
  }

  public static crear(proveedor: CrearProveedorDto): Partial<ProveedorModel> {
    const partiaAlmacen: Partial<CrearProveedorDto> = {
      Direccion: proveedor.Direccion ?? null,
      Correo: proveedor.Correo ?? null,
      Ruc: proveedor.Ruc ?? null,
      Telefono: proveedor.Telefono ?? null,
      Nombre: proveedor.Nombre ?? null,
    };
    Object.keys(partiaAlmacen).forEach(
      key => partiaAlmacen[key] === null && delete partiaAlmacen[key],
    );
    const usuarioLimpio: Partial<ProveedorModel> = Variables.limpiarVariables(
      partiaAlmacen,
    );

    return usuarioLimpio;
  }
}
