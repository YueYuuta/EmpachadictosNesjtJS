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

import { EnlaceMapper } from '@utils/Mappers/enlace';
import { CrearEnlaceCasoUso } from '../enlace-caso-uso/crear';
import { LeerEnlaceCasoUso } from '../enlace-caso-uso/leer';
import { EditarEnlaceCasoUso } from '../enlace-caso-uso/editar';
import { EliminarEnlaceCasoUso } from '../enlace-caso-uso/eliminar';
import { CrearEnlaceDto, EditarEnlaceDto, LeerEnlaceDto } from './dto';
import { PlanAlias } from '@utils/enums/rutas.enum';

// @UseGuarKds(AuthGuard('jwt'))
@Controller('enlace')
export class EnlaceController {
  constructor(
    private readonly _crearEnlaceService: CrearEnlaceCasoUso,
    private readonly _editarEnlaceService: EditarEnlaceCasoUso,
    private readonly _leerEnlaceService: LeerEnlaceCasoUso,
    private readonly _eliminarEnlaceService: EliminarEnlaceCasoUso,
  ) {}
  @Ruta(PlanAlias.EnlaceCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() enlace: CrearEnlaceDto): Promise<SalidaApi> {
    const respuesta: LeerEnlaceDto = await this._crearEnlaceService.crear(
      EnlaceMapper.crear(enlace),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Enlace creado correctamente`,
    };
  }

  @Ruta(PlanAlias.EnlaceEditar)
  @Patch('editar/:EnlaceID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() enlace: EditarEnlaceDto,
    @Param('EnlaceID', ParseIntPipe) EnlaceID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarEnlaceService.editar(
      EnlaceMapper.editar(enlace),
      EnlaceID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Enlace editado correctamente`,
    };
  }

  @Get('obtener/:EnlaceID')
  async obtenerPorId(
    @Param('EnlaceID', ParseIntPipe) EnlaceID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerEnlaceService.obtenerProId(EnlaceID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerEnlaceDto[] = await this._leerEnlaceService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(PlanAlias.EnlacePaginado)
  @Get('obtener/enlaces/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerEnlaceService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(PlanAlias.EnlaceElmininar)
  @Delete('eliminar/:EnlaceID')
  async eliminar(@Param('EnlaceID') EnlaceID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarEnlaceService.eliminar(EnlaceID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Enlace Eliminado correctamente',
    };
  }
}
