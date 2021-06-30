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
import { MenuMapper } from '@utils/Mappers/menu';
import { CrearMenuCasoUso } from '../menu-caso-uso/crear';
import { EditarMenuCasoUso } from '../menu-caso-uso/editar';
import { EliminarMenuCasoUso } from '../menu-caso-uso/eliminar';
import { LeerMenuCasoUso } from '../menu-caso-uso/leer';
import { CrearMenuDto, EditarMenuDto, LeerMenuDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('menu')
export class MenuController {
  constructor(
    private readonly _crearMenuService: CrearMenuCasoUso,
    private readonly _editarMenuService: EditarMenuCasoUso,
    private readonly _leerMenuService: LeerMenuCasoUso,
    private readonly _eliminarMenuService: EliminarMenuCasoUso,
  ) {}
  @Ruta(ProductoAlias.MenuCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() menu: CrearMenuDto): Promise<SalidaApi> {
    const respuesta: LeerMenuDto = await this._crearMenuService.crear(
      MenuMapper.crear(menu),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Menu creado correctamente`,
    };
  }

  @Ruta(ProductoAlias.MenuEditar)
  @Patch('editar/:MenuID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() menu: EditarMenuDto,
    @Param('MenuID', ParseIntPipe) MenuID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarMenuService.editar(
      MenuMapper.editar(menu),
      MenuID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Menu editado correctamente`,
    };
  }

  @Patch('crear/imagen/:ProductoID/:tipo')
  async crearImagen(
    @Param('ProductoID', ParseIntPipe) ProductoID: number,
    @Param('tipo') tipo: string,
    @Request() req: any,
  ): Promise<SalidaApi> {
    console.log(ProductoID, req.files);
    const respuesta = await this._crearMenuService.crearImagen(
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

  @Get('obtener/:MenuID')
  async obtenerPorId(
    @Param('MenuID', ParseIntPipe) MenuID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerMenuService.obtenerProId(MenuID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.MenuPaginado)
  @Get('obtener/menus/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerMenuService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.MenuPaginado)
  @Get('obtener/menus-por-categoria/:desde/:limite/:CategoriaID/:termino?')
  async ObtenerPaginadoPorCategoria(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
    @Param('CategoriaID') CategoriaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerMenuService.obtenerPaginadoPorCategoria(
      desde,
      limite,
      CategoriaID,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.MenuElmininar)
  @Delete('eliminar/:MenuID')
  async eliminar(@Param('MenuID') MenuID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarMenuService.eliminar(MenuID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Menu Eliminado correctamente',
    };
  }
}
