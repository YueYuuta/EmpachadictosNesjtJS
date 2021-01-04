import {
  Inject,
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { LeerProductoDto } from '../api/dto';

import { plainToClass } from 'class-transformer';
import { IProductoCasoUso } from './IProductoCasoUso';
import { Producto } from '../entidates/producto.entity';
import { ProductoModel } from './models/producto';
import { SharedService } from '../../shared/services/shared.service';
import { LeerCategoriaCasoUso } from '../../categoria/categoria-caso-uso/leer';
import { manejoDeImagenes } from '@utils/manejo-imagenes/imagen-express-fileup';
import { PathFile } from '@utils/enums';

const ProductoRepo = () => Inject('ProductoRepo');

@Injectable()
export class CrearProductoCasoUso {
  constructor(
    @ProductoRepo() private readonly _productoRepository: IProductoCasoUso,
    private readonly _sharedService: SharedService,
    private readonly _categoriaService: LeerCategoriaCasoUso,
  ) {}

  async crear(producto: ProductoModel): Promise<LeerProductoDto> {
    const {
      Categoria,
      EstadoIva,
      PrecioCompra,
      PrecioVenta,
      EstadoDescuento,
      PrecioVentaConDescuento,
    } = producto;

    await this._categoriaService.obtenerProId(Categoria);
    producto.Descripcion = producto.Descripcion.toUpperCase();
    const descripcionProducto = await this._productoRepository.verificarDescripcion(
      producto.Descripcion,
    );
    if (descripcionProducto) {
      throw new ConflictException(
        `La descripcion: ${producto.Descripcion}, ya existe!`,
      );
    }

    producto.PrecioSinIva = await this._sharedService.calcularPrecioSinIva(
      EstadoIva,
      PrecioVenta,
    );

    producto.PorcentajeGanancia = await this._sharedService.calcularPorcentaje(
      EstadoIva,
      PrecioCompra,
      PrecioVenta,
    );

    if (EstadoDescuento) {
      if (!PrecioVentaConDescuento) {
        throw new ConflictException(`Debe enviar un precio de descuento!`);
      }
      producto.PrecioSinIvaDescuento = await this._sharedService.calcularPrecioSinIva(
        EstadoIva,
        PrecioVentaConDescuento,
      );

      producto.PorcentajeGananciaDescuento = await this._sharedService.calcularPorcentaje(
        EstadoIva,
        PrecioCompra,
        PrecioVentaConDescuento,
      );
    }

    const productoGuardado: Producto = await this._productoRepository.crear(
      producto,
    );
    return plainToClass(LeerProductoDto, productoGuardado);
  }

  async crearImagen(
    ProductoID: number,
    req: any,
    tipo?: string,
  ): Promise<boolean> {
    const producto: Producto = await this._productoRepository.obtenerPodId(
      ProductoID,
    );
    let response = false;
    let nombreImagen: string;
    try {
      if (req.files) {
        nombreImagen = await manejoDeImagenes(req, PathFile.PRODUCTS);
      }
      if (nombreImagen) {
        producto.Imagen = nombreImagen;
        response = await this._productoRepository.editar(producto, ProductoID);
      }
      return response;
    } catch (error) {
      if (tipo === 'crear') {
        await this._productoRepository.eliminarDefinitivamente(ProductoID);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
