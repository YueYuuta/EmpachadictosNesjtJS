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

import { ProvinciaMapper } from '@utils/Mappers/provincia';
import { CrearProvinciaCasoUso } from '../provincia-caso-uso/crear';
import { LeerProvinciaCasoUso } from '../provincia-caso-uso/leer';
import { EditarProvinciaCasoUso } from '../provincia-caso-uso/editar';
import { EliminarProvinciaCasoUso } from '../provincia-caso-uso/eliminar';
import { CrearProvinciaDto, EditarProvinciaDto, LeerProvinciaDto } from './dto';
import { UbicacionAlias } from '@utils/enums/rutas.enum';

// @UseGuarKds(AuthGuard('jwt'))
@Controller('provincia')
export class ProvinciaController {
  constructor(
    private readonly _crearProvinciaService: CrearProvinciaCasoUso,
    private readonly _editarProvinciaService: EditarProvinciaCasoUso,
    private readonly _leerProvinciaService: LeerProvinciaCasoUso,
    private readonly _eliminarProvinciaService: EliminarProvinciaCasoUso,
  ) {}
  @Ruta(UbicacionAlias.ProvinciaCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() provincia: CrearProvinciaDto): Promise<SalidaApi> {
    const respuesta: LeerProvinciaDto = await this._crearProvinciaService.crear(
      ProvinciaMapper.crear(provincia),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Provincia creado correctamente`,
    };
  }

  @Ruta(UbicacionAlias.ProvinciaEditar)
  @Patch('editar/:ProvinciaID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() provincia: EditarProvinciaDto,
    @Param('ProvinciaID', ParseIntPipe) ProvinciaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarProvinciaService.editar(
      ProvinciaMapper.editar(provincia),
      ProvinciaID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Provincia editado correctamente`,
    };
  }

  @Get('obtener/:ProvinciaID')
  async obtenerPorId(
    @Param('ProvinciaID', ParseIntPipe) ProvinciaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProvinciaService.obtenerProId(
      ProvinciaID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerProvinciaDto[] = await this._leerProvinciaService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(UbicacionAlias.ProvinciaPaginado)
  @Get('obtener/provincias/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProvinciaService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(UbicacionAlias.ProvinciaElmininar)
  @Delete('eliminar/:ProvinciaID')
  async eliminar(
    @Param('ProvinciaID') ProvinciaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._eliminarProvinciaService.eliminar(
      ProvinciaID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Provincia Eliminado correctamente',
    };
  }
}
