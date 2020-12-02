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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrearUsuarioAlmacenCasoUso } from '../usuario-almacen-caso-uso/crear';
import { EditarUsuarioAlmacenCasoUso } from '../usuario-almacen-caso-uso/editar';
import { LeerUsuarioAlmacenCasoUso } from '../usuario-almacen-caso-uso/leer';
import { EliminarUsuarioAlmacenCasoUso } from '../usuario-almacen-caso-uso/eliminar';
import {
  CrearUsuarioAlmacenDto,
  EditarUsuarioAlmacenDto,
  LeerUsuarioAlmacenDto,
} from './dto';
import { SalidaApi } from '@modulos/shared/models/salida-api';
import { UsuarioAlmacenMapper } from '@utils/Mappers/usuario-almacen';

import { UalmacenParamsGuard } from '../guard/ualmacen-params.guard';

@UseGuards(AuthGuard('jwt'), UalmacenParamsGuard)
@Controller('usuario-almacen')
export class UsuarioAlmacenController {
  constructor(
    private readonly _crearUsuarioAlmacenService: CrearUsuarioAlmacenCasoUso,
    private readonly _editarUsuarioAlmacenService: EditarUsuarioAlmacenCasoUso,
    private readonly _leerUsuarioAlmacenService: LeerUsuarioAlmacenCasoUso,
    private readonly _eliminarUsuarioAlmacenService: EliminarUsuarioAlmacenCasoUso,
  ) {}

  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(
    @Body() usuarioAlmacen: CrearUsuarioAlmacenDto,
  ): Promise<SalidaApi> {
    const respuesta: LeerUsuarioAlmacenDto = await this._crearUsuarioAlmacenService.crear(
      usuarioAlmacen,
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Usuario almacen creado correctamente`,
    };
  }

  @Patch('editar/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() usuarioAlmacen: EditarUsuarioAlmacenDto,
    @Param('id', ParseIntPipe) UsuarioAlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarUsuarioAlmacenService.editar(
      UsuarioAlmacenMapper.editar(usuarioAlmacen),
      UsuarioAlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Usuario almacen editado correctamente`,
    };
  }

  @Get('obtener/:id')
  async obtenerPorId(
    @Param('id', ParseIntPipe) UsuarioAlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioAlmacenService.obtenerProId(
      UsuarioAlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener/paginado/:desde/:limite')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioAlmacenService.obtenerPaginado(
      desde,
      limite,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerUsuarioAlmacenDto[] = await this._leerUsuarioAlmacenService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener/almacenes/table/input/:termino')
  async obtenerPorBusqueda(
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioAlmacenService.obtenerProBusqueda(
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }
  @Get('obtener/usuario/:id')
  async obtenerPorUsuario(
    @Param('id', ParseIntPipe) UsuarioID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioAlmacenService.obtenerPorUsuario(
      UsuarioID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }
  @Get('obtener/almacen/:id')
  async obtenerPorAlmacen(
    @Param('id', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioAlmacenService.obtenerPorAlmacen(
      AlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }
  @Delete('eliminar/:id')
  async eliminar(@Param('id') AlmacenID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarUsuarioAlmacenService.eliminar(
      AlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Almacen Eliminado correctamente',
    };
  }
}
