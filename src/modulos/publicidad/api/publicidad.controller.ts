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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PublicidadMapper } from '@utils/Mappers/publicidad';

import {
  CrearPublicidadDto,
  EditarPublicidadDto,
  LeerPublicidadDto,
} from './dto';
import { ClienteAlias } from '@utils/enums/rutas.enum';
import { CrearPublicidadCasoUso } from '../publicidad-caso-uso/crear';
import { EditarPublicidadCasoUso } from '../publicidad-caso-uso/editar';
import { LeerPublicidadCasoUso } from '../publicidad-caso-uso/leer';
import { EliminarPublicidadCasoUso } from '../publicidad-caso-uso/eliminar';

// @UseGuarKds(AuthGuard('jwt'))
@Controller('publicidad')
export class PublicidadController {
  constructor(
    private readonly _crearPublicidadService: CrearPublicidadCasoUso,
    private readonly _editarPublicidadService: EditarPublicidadCasoUso,
    private readonly _leerPublicidadService: LeerPublicidadCasoUso,
    private readonly _eliminarPublicidadService: EliminarPublicidadCasoUso,
  ) {}
  @Ruta(ClienteAlias.PublicidadCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() publicidad: CrearPublicidadDto): Promise<SalidaApi> {
    const respuesta: LeerPublicidadDto = await this._crearPublicidadService.crear(
      PublicidadMapper.crear(publicidad),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Publicidad creado correctamente`,
    };
  }

  @Ruta(ClienteAlias.PublicidadEditar)
  @Patch('editar/:PublicidadID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() publicidad: EditarPublicidadDto,
    @Param('PublicidadID', ParseIntPipe) PublicidadID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarPublicidadService.editar(
      PublicidadMapper.editar(publicidad),
      PublicidadID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Publicidad editado correctamente`,
    };
  }

  @Get('obtener/:PublicidadID')
  async obtenerPorId(
    @Param('PublicidadID', ParseIntPipe) PublicidadID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerPublicidadService.obtenerProId(
      PublicidadID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerPublicidadDto[] = await this._leerPublicidadService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ClienteAlias.PublicidadPaginado)
  @Get('obtener/publicidads/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerPublicidadService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ClienteAlias.PublicidadElmininar)
  @Delete('eliminar/:PublicidadID')
  async eliminar(
    @Param('PublicidadID') PublicidadID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._eliminarPublicidadService.eliminar(
      PublicidadID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Publicidad Eliminado correctamente',
    };
  }
}
