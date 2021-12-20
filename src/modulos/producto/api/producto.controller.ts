import { Ruta } from '@modulos/shared/decorador/ruta.decorador';
import { SalidaApi } from '@modulos/shared/models/salida-api';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Patch,
  Param,
  ParseIntPipe,
  Get,
  UseGuards,
  HttpStatus,
  Delete,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductoAlias } from '@utils/enums/rutas.enum';
import { ProductoMapper } from '@utils/Mappers/producto';
import { CrearProductoCasoUso } from '../producto-caso-uso/crear';
import { EditarProductoCasoUso } from '../producto-caso-uso/editar';
import { EliminarProductoCasoUso } from '../producto-caso-uso/eliminar';
import { LeerProductoCasoUso } from '../producto-caso-uso/leer';
import { CrearProductoDto, EditarProductoDto, LeerProductoDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('producto')
export class ProductoController {
  constructor(
    private readonly _crearProductoService: CrearProductoCasoUso,
    private readonly _editarProductoService: EditarProductoCasoUso,
    private readonly _leerProductoService: LeerProductoCasoUso,
    private readonly _eliminarProductoService: EliminarProductoCasoUso,
  ) {}
  @Ruta(ProductoAlias.ProductoCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() producto: CrearProductoDto): Promise<SalidaApi> {
    const respuesta: LeerProductoDto = await this._crearProductoService.crear(
      ProductoMapper.crear(producto),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Producto creado correctamente`,
    };
  }

  @Ruta(ProductoAlias.ProductoEditar)
  @Patch('editar/:ProductoID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() producto: EditarProductoDto,
    @Param('ProductoID', ParseIntPipe) ProductoID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarProductoService.editar(
      ProductoMapper.editar(producto),
      ProductoID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Producto editado correctamente`,
    };
  }

  @Patch('crear/imagen/:ProductoID/:tipo')
  async crearImagen(
    @Param('ProductoID', ParseIntPipe) ProductoID: number,
    @Param('tipo') tipo: string,
    @Request() req: any,
  ): Promise<SalidaApi> {
    const respuesta = await this._crearProductoService.crearImagen(
      ProductoID,
      req,
      tipo,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Imagen guardada correctamente`,
    };
  }

  @Get('obtener/por/descripcion/:Descripcion')
  async obtenerProductoPorNombre(
    @Param('Descripcion') Descripcion: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProductoService.obtenerProductoPorNombre(
      Descripcion,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener/por/codigo/barra/:codigo')
  async obtenerProductoPorCodigoDeBarra(
    @Param('codigo') CodigoBarra: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProductoService.obtenerProductoPorCodigoDeBarra(
      CodigoBarra,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener/:ProductoID')
  async obtenerPorId(
    @Param('ProductoID', ParseIntPipe) ProductoID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProductoService.obtenerProId(ProductoID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.ProductoPaginado)
  @Get('obtener/productos/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProductoService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.ProductoPaginado)
  @Get('obtener/productos-por-categoria/:desde/:limite/:CategoriaID/:termino?')
  async ObtenerPaginadoPorCategoria(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
    @Param('CategoriaID') CategoriaID: number,
  ): Promise<SalidaApi> {
    console.log(desde, limite, CategoriaID, termino);
    const respuesta = await this._leerProductoService.obtenerPaginadoPorCategoria(
      desde,
      limite,
      CategoriaID,
      termino,
    );
    console.log(respuesta);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.ProductoElmininar)
  @Delete('eliminar/:ProductoID')
  async eliminar(@Param('ProductoID') ProductoID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarProductoService.eliminar(ProductoID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Producto Eliminado correctamente',
    };
  }
}
