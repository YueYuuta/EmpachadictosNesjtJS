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

import { TerminoMapper } from '@utils/Mappers/termino';
import { CrearTerminoDto, EditarTerminoDto, LeerTerminoDto } from './dto';
import { PlanAlias } from '@utils/enums/rutas.enum';
import { CrearTerminoCasoUso } from '../termino-caso-uso/crear';
import { EditarTerminoCasoUso } from '../termino-caso-uso/editar';
import { LeerTerminoCasoUso } from '../termino-caso-uso/leer';
import { EliminarTerminoCasoUso } from '../termino-caso-uso/eliminar';

// @UseGuarKds(AuthGuard('jwt'))
@Controller('termino')
export class TerminoController {
  constructor(
    private readonly _crearTerminoService: CrearTerminoCasoUso,
    private readonly _editarTerminoService: EditarTerminoCasoUso,
    private readonly _leerTerminoService: LeerTerminoCasoUso,
    private readonly _eliminarTerminoService: EliminarTerminoCasoUso,
  ) {}
  @Ruta(PlanAlias.TerminoCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() termino: CrearTerminoDto): Promise<SalidaApi> {
    const respuesta: LeerTerminoDto = await this._crearTerminoService.crear(
      TerminoMapper.crear(termino),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Termino creado correctamente`,
    };
  }

  @Ruta(PlanAlias.TerminoEditar)
  @Patch('editar/:TerminoID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() termino: EditarTerminoDto,
    @Param('TerminoID', ParseIntPipe) TerminoID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarTerminoService.editar(
      TerminoMapper.editar(termino),
      TerminoID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Termino editado correctamente`,
    };
  }

  @Get('obtener/:TerminoID')
  async obtenerPorId(
    @Param('TerminoID', ParseIntPipe) TerminoID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerTerminoService.obtenerProId(TerminoID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerTerminoDto[] = await this._leerTerminoService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(PlanAlias.TerminoPaginado)
  @Get('obtener/terminos/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerTerminoService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(PlanAlias.TerminoElmininar)
  @Delete('eliminar/:TerminoID')
  async eliminar(@Param('TerminoID') TerminoID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarTerminoService.eliminar(TerminoID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Termino Eliminado correctamente',
    };
  }
}
