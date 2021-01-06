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

import { CantonMapper } from '@utils/Mappers/canton';
import { CrearCantonCasoUso } from '../canton-caso-uso/crear';
import { LeerCantonCasoUso } from '../canton-caso-uso/leer';
import { EditarCantonCasoUso } from '../canton-caso-uso/editar';
import { EliminarCantonCasoUso } from '../canton-caso-uso/eliminar';
import { CrearCantonDto, EditarCantonDto, LeerCantonDto } from './dto';
import { UbicacionAlias } from '@utils/enums/rutas.enum';

// @UseGuarKds(AuthGuard('jwt'))
@Controller('canton')
export class CantonController {
  constructor(
    private readonly _crearCantonService: CrearCantonCasoUso,
    private readonly _editarCantonService: EditarCantonCasoUso,
    private readonly _leerCantonService: LeerCantonCasoUso,
    private readonly _eliminarCantonService: EliminarCantonCasoUso,
  ) {}
  @Ruta(UbicacionAlias.CantonCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() canton: CrearCantonDto): Promise<SalidaApi> {
    const respuesta: LeerCantonDto = await this._crearCantonService.crear(
      CantonMapper.crear(canton),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Canton creado correctamente`,
    };
  }

  @Ruta(UbicacionAlias.CantonEditar)
  @Patch('editar/:CantonID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() canton: EditarCantonDto,
    @Param('CantonID', ParseIntPipe) CantonID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarCantonService.editar(
      CantonMapper.editar(canton),
      CantonID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Canton editado correctamente`,
    };
  }

  @Get('obtener/:CantonID')
  async obtenerPorId(
    @Param('CantonID', ParseIntPipe) CantonID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerCantonService.obtenerProId(CantonID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerCantonDto[] = await this._leerCantonService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(UbicacionAlias.CantonPaginado)
  @Get('obtener/cantons/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerCantonService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(UbicacionAlias.CantonElmininar)
  @Delete('eliminar/:CantonID')
  async eliminar(@Param('CantonID') CantonID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarCantonService.eliminar(CantonID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Canton Eliminado correctamente',
    };
  }
}
