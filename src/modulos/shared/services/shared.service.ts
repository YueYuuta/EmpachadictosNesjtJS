import { Injectable } from '@nestjs/common';
import { Iva } from '@utils/enums';

@Injectable()
export class SharedService {
  private porcentaje: number;
  private precio: number;

  async calcularPrecioSinIva(
    EstadoIva: boolean,
    PrecioVenta: number,
  ): Promise<number> {
    if (EstadoIva) {
      this.precio = PrecioVenta / Iva.ivaCalculoDirecto;
    } else {
      this.precio = PrecioVenta;
    }
    return this.precio;
  }

  async calcularPrecioConIva(
    EstadoIva: boolean,
    PrecioSinVenta: number,
  ): Promise<number> {
    if (EstadoIva) {
      this.precio = PrecioSinVenta * Iva.ivaCalculoDirecto;
    } else {
      this.precio = PrecioSinVenta;
    }
    return this.precio;
  }

  async calcularIva(EstadoIva: boolean, PrecioVenta: number): Promise<number> {
    if (EstadoIva) {
      this.precio = PrecioVenta * Iva.ivaCalculado;
    } else {
      this.precio = 0;
    }
    return this.precio;
  }

  async calcularPorcentaje(
    EstadoIva: boolean,
    PrecioCompra: number,
    PrecioVenta: number,
  ): Promise<number> {
    if (EstadoIva) {
      this.porcentaje = await this.calcularPorcentajeConIva(
        PrecioCompra,
        PrecioVenta,
      );
    } else {
      this.porcentaje = await this.calcularPorcentajeSinIva(
        PrecioCompra,
        PrecioVenta,
      );
    }
    return this.porcentaje;
  }

  async calcularPorcentajeConIva(
    PrecioCompra: number,
    PrecioVenta: number,
  ): Promise<number> {
    const porcentaje: number =
      (((PrecioVenta - PrecioCompra) * Iva.ivaCalculoDirecto) / PrecioCompra) *
      100;
    return porcentaje;
  }

  async calcularPorcentajeSinIva(
    PrecioCompra: number,
    PrecioVenta: number,
  ): Promise<number> {
    const porcentaje: number =
      ((PrecioVenta - PrecioCompra) / PrecioCompra) * 100;
    return porcentaje;
  }
}
