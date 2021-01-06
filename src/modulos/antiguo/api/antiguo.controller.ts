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

import { AntiguoMapper } from '@utils/Mappers/antiguo';

import { CrearAntiguoDto, EditarAntiguoDto, LeerAntiguoDto } from './dto';
import { AntiguoAlias } from '@utils/enums/rutas.enum';
import { CrearAntiguoCasoUso } from '../antiguo-caso-uso/crear';
import { EditarAntiguoCasoUso } from '../antiguo-caso-uso/editar';
import { LeerAntiguoCasoUso } from '../antiguo-caso-uso/leer';
import { EliminarAntiguoCasoUso } from '../antiguo-caso-uso/eliminar';

// @UseGuarKds(AuthGuard('jwt'))
@Controller('antiguo')
export class AntiguoController {
  constructor(
    private readonly _crearAntiguoService: CrearAntiguoCasoUso,
    private readonly _editarAntiguoService: EditarAntiguoCasoUso,
    private readonly _leerAntiguoService: LeerAntiguoCasoUso,
    private readonly _eliminarAntiguoService: EliminarAntiguoCasoUso,
  ) {}
  @Ruta(AntiguoAlias.AntiguoCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() antiguo: CrearAntiguoDto): Promise<SalidaApi> {
    const respuesta: LeerAntiguoDto = await this._crearAntiguoService.crear(
      AntiguoMapper.crear(antiguo),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Antiguo creado correctamente`,
    };
  }

  @Ruta(AntiguoAlias.AntiguoEditar)
  @Patch('editar/:AntiguoID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() antiguo: EditarAntiguoDto,
    @Param('AntiguoID', ParseIntPipe) AntiguoID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarAntiguoService.editar(
      AntiguoMapper.editar(antiguo),
      AntiguoID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Antiguo editado correctamente`,
    };
  }

  @Get('obtener/:AntiguoID')
  async obtenerPorId(
    @Param('AntiguoID', ParseIntPipe) AntiguoID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerAntiguoService.obtenerProId(AntiguoID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerAntiguoDto[] = await this._leerAntiguoService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(AntiguoAlias.AntiguoPaginado)
  @Get('obtener/antiguos/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerAntiguoService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(AntiguoAlias.AntiguoElmininar)
  @Delete('eliminar/:AntiguoID')
  async eliminar(@Param('AntiguoID') AntiguoID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarAntiguoService.eliminar(AntiguoID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Antiguo Eliminado correctamente',
    };
  }
}
