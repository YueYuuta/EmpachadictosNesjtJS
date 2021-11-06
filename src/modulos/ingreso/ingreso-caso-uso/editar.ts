import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SharedService } from '@modulos/shared/services/shared.service';
import { IIngresoCasoUso } from './IIngresoCasoUso';
import { IngresoEditarModel } from './models/ingreso.model';
import { LeerAlmacenCasoUso } from '@modulos/almacen/almacen-caso-uso/leer';
import { LeerProveedorCasoUso } from '@modulos/proveedor/proveedor-caso-uso/leer';
import { LeerProductoCasoUso } from '@modulos/producto/producto-caso-uso/leer';
import { IngresoDetalleModel } from './models/ingreso-detalle.model';
import { CalculoModel } from './models/calculo.model';
import { plainToClass } from 'class-transformer';
import { LeerIngresoDto } from '../api/dto';
import { CrearProductoAlmacenCasoUso } from '@modulos/producto-almacen/producto-almacen-caso-uso/crear';
import { TipoVariable } from '@utils/enums';
import { CrearIngresoCasoUso } from './crear';
import { IngresoDetalleEliminarModel } from './models/ingreso-detalle-editar.model';
import { EditarProductoAlmacenCasoUso } from '@modulos/producto-almacen/producto-almacen-caso-uso/editar';
import { EliminarProductoAlmacenCasoUso } from '@modulos/producto-almacen/producto-almacen-caso-uso/eliminar';
const IngresoRepo = () => Inject('IngresoRepo');

@Injectable()
export class EditarIngresoCasoUso {
  constructor(
    @IngresoRepo() private readonly _ingresoRepository: IIngresoCasoUso,
    private readonly _sharedService: SharedService,
    private readonly _almacenService: LeerAlmacenCasoUso,
    private readonly _productoService: LeerProductoCasoUso,
    private readonly _proveedorService: LeerProveedorCasoUso,
    private readonly _productoAlmacenService: CrearProductoAlmacenCasoUso,
    private readonly _editarProductoAlmacenService: EditarProductoAlmacenCasoUso,
    private readonly _eliminarProductoAlmacenService: EliminarProductoAlmacenCasoUso,
    private readonly _crearIngresoService: CrearIngresoCasoUso,
  ) {}

  async editar(
    ingreso: IngresoEditarModel,
    IngresoID: number,
  ): Promise<LeerIngresoDto> {
    let detalleCrear = [];
    let detalleEditar = [];
    //validaciones
    if (!ingreso.Detalle) {
      throw new NotFoundException('Igrese el detalle del ingreso!');
    }
    await this._proveedorService.obtenerProId(ingreso.ProveedorID);
    const ingresoDB: any = await this._ingresoRepository.obtenerPorId(
      IngresoID,
    );
    await this._almacenService.obtenerProId(ingresoDB.AlmacenID.AlmacenID);

    //obtener los resultados

    detalleCrear = await this.validarDetalle(ingreso.Detalle.Crear, IngresoID);
    detalleEditar = await this.validarDetalle(
      ingreso.Detalle.Editar,
      IngresoID,
    );
    await this.validarDetalleExiste(ingreso.Detalle.Eliminar);
    await this.validarDetalleExiste(ingreso.Detalle.Editar);

    if (detalleCrear.length > 0) {
      await this.guardarDetalleBD(detalleCrear, ingresoDB.AlmacenID.AlmacenID);
      //   await this.crearStock(ingresoDB.AlmacenID.AlmacenID, detalleCrear);
      console.log('lo que paso en crear!');
    }

    if (detalleEditar.length > 0) {
      await this.editarDetalleBD(detalleEditar);
      await this.crearStockEditar(ingresoDB.AlmacenID.AlmacenID, detalleEditar);
      console.log('lo que paso en editar!');
    }
    if (ingreso.Detalle.Eliminar !== undefined) {
      if (ingreso.Detalle.Eliminar.length > 0) {
        await this.eliminarDetalleBD(ingreso.Detalle.Eliminar);
        await this.crearStockEliminar(ingreso.Detalle.Eliminar);
        console.log('lo que paso en eliminar!');
      }
    }

    const ingresoDetalleBd = await this._ingresoRepository.obtenerDetallePorIngresoID(
      IngresoID,
    );
    const totales = await this.calculoDettalle(ingresoDetalleBd);
    ingreso.Subtotal0 = totales.Totales.Subtotal0;
    ingreso.Subtotal12 = totales.Totales.Subtotal12;
    ingreso.Subtotal = totales.Totales.Subtotal;
    ingreso.Total = totales.Totales.Total;
    ingreso.Iva = totales.Totales.Iva;
    ingreso.Detalle = null;
    const ingresoGuardado = await this._ingresoRepository.editar(
      ingreso,
      IngresoID,
    );
    return plainToClass(LeerIngresoDto, ingresoGuardado);
  }

  async guardarDetalleBD(
    detalle: IngresoDetalleModel[],
    AlmacenID: number,
  ): Promise<boolean> {
    for (const producto of detalle) {
      const detalleGuardado = await this._crearIngresoService.crearDetalle(
        producto,
      );
      const cabecera = {
        AlmacenID,
        ProductoID: producto.ProductoID,
      };
      const detalle = {
        IngresoDetalle: producto.Cantidad,

        PrecioCompra: producto.PrecioCompra,

        Lote: producto.Lote,

        IngresoDetalleID: detalleGuardado.IngresoDetalleID,
      };
      await this._productoAlmacenService.crearIngreso(cabecera, detalle);
    }
    return true;
  }

  async editarDetalleBD(detalle: IngresoDetalleModel[]): Promise<boolean> {
    for (const producto of detalle) {
      await this._ingresoRepository.editarDetalle(producto);
    }
    return true;
  }

  async eliminarDetalleBD(
    detalle: IngresoDetalleEliminarModel[],
  ): Promise<boolean> {
    for (const producto of detalle) {
      await this._ingresoRepository.eliminarDetalle(producto.IngresoDetalleID);
    }
    return true;
  }

  async validarDetalleExiste(detalle: any[]): Promise<void> {
    if (detalle !== undefined) {
      for (const producto of detalle) {
        await this._ingresoRepository.obtenerDetallePorID(
          producto.IngresoDetalleID,
        );
      }
    }
  }

  //   private async crearStock(
  //     AlmacenID: number,
  //     // cabecera: CrearProductoAlmacenIngresoModel,
  //     detalle: any[],
  //   ): Promise<any> {
  //     for (const producto of detalle) {
  //       const cabecera = {
  //         AlmacenID,
  //         ProductoID: producto.ProductoID,
  //       };
  //       const detalle = {
  //         IngresoDetalle: producto.Cantidad,

  //         PrecioCompra: producto.PrecioCompra,

  //         Lote: producto.Lote,

  //         IngresoDetalleID: producto.IngresoDetalleID,
  //       };
  //       console.log(cabecera, detalle);
  //       await this._productoAlmacenService.crearIngreso(cabecera, detalle);
  //     }
  //   }

  private async crearStockEditar(
    AlmacenID: number,
    // cabecera: CrearProductoAlmacenIngresoModel,
    detalle: IngresoDetalleModel[],
  ): Promise<any> {
    for (const producto of detalle) {
      console.log(producto);
      await this._editarProductoAlmacenService.editarIngresoProductoAlmacenDetalle(
        producto.IngresoDetalleID,
        producto.Cantidad,
      );
    }
  }

  private async crearStockEliminar(
    detalle: IngresoDetalleEliminarModel[],
  ): Promise<any> {
    for (const producto of detalle) {
      await this._eliminarProductoAlmacenService.eliminarDetalle(
        producto.IngresoDetalleID,
      );
    }
  }

  private async validarDetalle(
    detalle: IngresoDetalleModel[],
    IngresoID: number,
  ): Promise<IngresoDetalleModel[]> {
    if (detalle !== undefined) {
      for (let index = 0; index < detalle.length; index++) {
        const producto = detalle[index];
        const productoDb = await this._productoService.obtenerProId(
          producto.ProductoID,
        );

        if (
          producto.Cantidad <= 0 ||
          !producto.Cantidad ||
          typeof producto.Cantidad != TipoVariable.NUMBER
        ) {
          throw new ConflictException(
            `Ingrese una cantidad valida en el producto: ${productoDb.Descripcion}!`,
          );
        }

        const precioCompra = Number(producto.PrecioCompra);
        if (precioCompra < 0 || typeof precioCompra != TipoVariable.NUMBER) {
          throw new ConflictException(
            `Ingrese un precio de compra valido en el producto: ${productoDb.Descripcion}!`,
          );
        }
        detalle[index].Descripcion = productoDb.Descripcion;
        detalle[index].IngresoID = IngresoID;
        detalle[index].EstadoIva = productoDb.EstadoIva;
        detalle[index].Iva = await this._sharedService.calcularIva(
          productoDb.EstadoIva,
          producto.PrecioCompra,
        );
        detalle[
          index
        ].PorcentajeGanancia = await this._sharedService.calcularPorcentaje(
          productoDb.EstadoIva,
          producto.PrecioCompra,
          productoDb.PrecioVenta,
        );
        detalle[index].Total = producto.PrecioCompra * producto.Cantidad;
        detalle[index].TotalIva = await this._sharedService.calcularIva(
          productoDb.EstadoIva,
          detalle[index].Total,
        );
        detalle[index].TotalsinIva =
          detalle[index].Total - detalle[index].TotalIva;
      }
      return detalle;
    } else {
      return [];
    }
  }
  private async calculoDettalle(
    detalle: IngresoDetalleModel[],
  ): Promise<{ Detalle: IngresoDetalleModel[]; Totales: CalculoModel }> {
    let Subtotal0 = 0;
    let Subtotal12 = 0;
    let Iva = 0;
    let Total = 0;
    let Subtotal = 0;
    for (const producto of detalle) {
      if (producto.EstadoIva) {
        Subtotal12 = Subtotal12 + producto.TotalsinIva;
      } else {
        Subtotal0 = Subtotal0 + producto.TotalsinIva;
      }
      Iva = Iva + producto.TotalIva;
    }
    Subtotal = Subtotal0 + Subtotal12;
    Total = Subtotal + Iva;
    return {
      Detalle: detalle,
      Totales: {
        Subtotal0,

        Subtotal12,

        Iva: Iva,

        Subtotal,

        Total,
      },
    };
  }
}
