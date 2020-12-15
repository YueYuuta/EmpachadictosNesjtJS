import { Variables } from '@utils/manejo-variables/variables';
import { EditarClienteDto } from '@modulos/cliente/api/dto/editar-cliente.dto';
import { ClienteModel } from '../../modulos/cliente/cliente-caso-uso/models/cliente';
import { CrearClienteDto } from '../../modulos/cliente/api/dto/crear-cliente.dto';

export class ClienteMapper {
  public static editar(cliente: EditarClienteDto): Partial<ClienteModel> {
    const partiaAlmacen: Partial<EditarClienteDto> = {
      Direccion: cliente.Direccion ?? null,
      Correo: cliente.Correo ?? null,
      Ruc: cliente.Ruc ?? null,
      Telefono: cliente.Telefono ?? null,
      Cedula: cliente.Cedula ?? null,
      Nombre: cliente.Nombre ?? null,
      Otro: cliente.Otro ?? null,
    };
    Object.keys(partiaAlmacen).forEach(
      key => partiaAlmacen[key] === null && delete partiaAlmacen[key],
    );
    const usuarioLimpio: Partial<ClienteModel> = Variables.limpiarVariables(
      partiaAlmacen,
    );

    return usuarioLimpio;
  }

  public static crear(cliente: CrearClienteDto): Partial<ClienteModel> {
    const partiaAlmacen: Partial<CrearClienteDto> = {
      Direccion: cliente.Direccion ?? null,
      Correo: cliente.Correo ?? null,
      Ruc: cliente.Ruc ?? null,
      Telefono: cliente.Telefono ?? null,
      Cedula: cliente.Cedula ?? null,
      Nombre: cliente.Nombre ?? null,
      Otro: cliente.Otro ?? null,
    };
    Object.keys(partiaAlmacen).forEach(
      key => partiaAlmacen[key] === null && delete partiaAlmacen[key],
    );
    const usuarioLimpio: Partial<ClienteModel> = Variables.limpiarVariables(
      partiaAlmacen,
    );

    return usuarioLimpio;
  }
}
