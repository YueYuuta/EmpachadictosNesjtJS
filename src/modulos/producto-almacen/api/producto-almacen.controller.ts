import { Ruta } from '@modulos/shared/decorador/ruta.decorador';
import { SalidaApi } from '@modulos/shared/models/salida-api';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Get,
  UseGuards,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductoAlias } from '@utils/enums/rutas.enum';

import { ProductoAlmacenMapper } from '../../../utils/Mappers/producto-almacen';
import { CrearProductoAlmacenCasoUso } from '../producto-almacen-caso-uso/crear';
import { EliminarProductoAlmacenCasoUso } from '../producto-almacen-caso-uso/eliminar';
import { LeerProductoAlmacenCasoUso } from '../producto-almacen-caso-uso/leer';
import { CrearProductoAlmacenEgresoDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('producto-almacen')
export class ProductoAlmacenController {
  constructor(
    private readonly _crearProductoAlmacenService: CrearProductoAlmacenCasoUso,
    private readonly _leerProductoAlmacenService: LeerProductoAlmacenCasoUso,
    private readonly _eliminarProductoAlmacenService: EliminarProductoAlmacenCasoUso,
  ) {}
  @Ruta(ProductoAlias.ProductoAlmacenCrear)
  @Post('crear-ingreso')
  @UsePipes(new ValidationPipe({ transform: true }))
  // async crearIngreso(
  //   @Body() productoAlmacen: CrearProductoAlmacenIngresoDto,
  // ): Promise<SalidaApi> {
  //   const respuesta: boolean = await this._crearProductoAlmacenService.crearIngreso(
  //     ProductoAlmacenMapper.crearIngreso(productoAlmacen),
  //   );
  //   return {
  //     status: HttpStatus.CREATED,
  //     data: respuesta,
  //     message: `ProductoAlmacen creado correctamente`,
  //   };
  // }
  @Ruta(ProductoAlias.ProductoAlmacenCrear)
  @Post('crear-egreso')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crearEgreso(
    @Body() productoAlmacen: CrearProductoAlmacenEgresoDto,
  ): Promise<SalidaApi> {
    const respuesta: boolean = await this._crearProductoAlmacenService.crearEgreso(
      ProductoAlmacenMapper.crearEgreso(productoAlmacen),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Producto Almacen creado correctamente`,
    };
  }

  @Get('obtener/:ProductoAlmacenID')
  async obtenerPorId(
    @Param('ProductoAlmacenID', ParseIntPipe) ProductoAlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProductoAlmacenService.obtenerProId(
      ProductoAlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener/por/descripcion/:Descripcion/:AlmacenID')
  async obtenerProductoPorNombre(
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
    @Param('Descripcion') Descripcion: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProductoAlmacenService.obtenerProductoPorNombre(
      Descripcion,
      AlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener/por/codigo/barra/:codigo/:AlmacenID')
  async obtenerProductoPorCodigoDeBarra(
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
    @Param('codigo') CodigoBarra: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProductoAlmacenService.obtenerProductoPorCodigoDeBarra(
      CodigoBarra,
      AlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.ProductoAlmacenPaginado)
  @Get('obtener/productos/:AlmacenID/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProductoAlmacenService.obtenerPaginado(
      desde,
      limite,
      AlmacenID,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.ProductoAlmacenPaginado)
  @Get(
    'obtener/productos-por-categoria/:AlmacenID/:desde/:limite/:CategoriaID/:termino?',
  )
  async ObtenerPaginadoPorCategoria(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
    @Param('CategoriaID') CategoriaID: number,
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProductoAlmacenService.obtenerPaginadoPorCategoria(
      desde,
      limite,
      CategoriaID,
      AlmacenID,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.ProductoAlmacenElmininar)
  @Delete('eliminar/:ProductoAlmacenID')
  async eliminar(
    @Param('ProductoAlmacenID') ProductoAlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._eliminarProductoAlmacenService.eliminar(
      ProductoAlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'ProductoAlmacen Eliminado correctamente',
    };
  }
}
