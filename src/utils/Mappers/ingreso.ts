import { CrearIngresoDto } from '@modulos/ingreso/api/dto';
import { Variables } from '@utils/manejo-variables/variables';
import { EditarIngresoDto } from '../../modulos/ingreso/api/dto/editar-ingreso.dto';
import { IngresoModel } from '../../modulos/ingreso/ingreso-caso-uso/models/ingreso.model';

export class IngresoMapper {
  public static editar(ingreso: EditarIngresoDto): IngresoModel {
    const partiaIngreso: EditarIngresoDto = {
      Detalle: ingreso.Detalle ?? null,
      Observacion: ingreso.Observacion ?? null,
      ProveedorID: ingreso.ProveedorID ?? null,
      TipoCompra: ingreso.TipoCompra ?? null,
      TipoPago: ingreso.TipoPago ?? null,
    };
    Object.keys(partiaIngreso).forEach(
      key => partiaIngreso[key] === null && delete partiaIngreso[key],
    );
    const ingresoLimpio: IngresoModel = Variables.limpiarVariables(
      partiaIngreso,
    );

    return ingresoLimpio;
  }

  public static crear(
    ingreso: CrearIngresoDto,
    UsuarioID: number,
  ): IngresoModel {
    const partiaIngreso: CrearIngresoDto = {
      Detalle: ingreso.Detalle ?? null,
      Observacion: ingreso.Observacion ?? null,
      ProveedorID: ingreso.ProveedorID ?? null,
      TipoCompra: ingreso.TipoCompra ?? null,
      TipoPago: ingreso.TipoPago ?? null,
      AlmacenID: ingreso.AlmacenID ?? null,
      UsuarioID: UsuarioID ?? null,
    };
    Object.keys(partiaIngreso).forEach(
      key => partiaIngreso[key] === null && delete partiaIngreso[key],
    );
    const ingresoLimpio: IngresoModel = Variables.limpiarVariables(
      partiaIngreso,
    );

    return ingresoLimpio;
  }
}
