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

import { CrearMenuAlmacenCasoUso } from '../menu-almacen-caso-uso/crear';
import { EliminarMenuAlmacenCasoUso } from '../menu-almacen-caso-uso/eliminar';
import { LeerMenuAlmacenCasoUso } from '../menu-almacen-caso-uso/leer';
import { CrearMenuAlmacenEgresoDto, CrearMenuAlmacenIngresoDto } from './dto';

import { MenuAlmacenMapper } from '../../../utils/Mappers/menu-almacen';

@UseGuards(AuthGuard('jwt'))
@Controller('menu-almacen')
export class MenuAlmacenController {
  constructor(
    private readonly _crearMenuAlmacenService: CrearMenuAlmacenCasoUso,
    private readonly _leerMenuAlmacenService: LeerMenuAlmacenCasoUso,
    private readonly _eliminarMenuAlmacenService: EliminarMenuAlmacenCasoUso,
  ) {}
  @Ruta(ProductoAlias.MenuAlmacenCrear)
  @Post('crear-ingreso')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crearIngreso(
    @Body() menuAlmacen: CrearMenuAlmacenIngresoDto,
  ): Promise<SalidaApi> {
    const respuesta: boolean = await this._crearMenuAlmacenService.crearIngreso(
      MenuAlmacenMapper.crearIngreso(menuAlmacen),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `MenuAlmacen creado correctamente`,
    };
  }

  @Ruta(ProductoAlias.MenuAlmacenCrear)
  @Post('crear-egreso')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crearEgreso(
    @Body() menuAlmacen: CrearMenuAlmacenEgresoDto,
  ): Promise<SalidaApi> {
    const respuesta: boolean = await this._crearMenuAlmacenService.crearEgreso(
      MenuAlmacenMapper.crearEgreso(menuAlmacen),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `MenuAlmacen creado correctamente`,
    };
  }

  @Get('obtener/:MenuAlmacenID')
  async obtenerPorId(
    @Param('MenuAlmacenID', ParseIntPipe) MenuAlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerMenuAlmacenService.obtenerProId(
      MenuAlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.MenuAlmacenPaginado)
  @Get('obtener/menus/:AlmacenID/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerMenuAlmacenService.obtenerPaginado(
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

  @Ruta(ProductoAlias.MenuAlmacenPaginado)
  @Get(
    'obtener/menus-por-categoria/:AlmacenID/:desde/:limite/:CategoriaID/:termino?',
  )
  async ObtenerPaginadoPorCategoria(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
    @Param('CategoriaID') CategoriaID: number,
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerMenuAlmacenService.obtenerPaginadoPorCategoria(
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

  @Ruta(ProductoAlias.MenuAlmacenElmininar)
  @Delete('eliminar/:MenuAlmacenID')
  async eliminar(
    @Param('MenuAlmacenID') MenuAlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._eliminarMenuAlmacenService.eliminar(
      MenuAlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'MenuAlmacen Eliminado correctamente',
    };
  }
}
