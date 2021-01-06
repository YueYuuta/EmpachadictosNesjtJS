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

import { ParroquiaMapper } from '@utils/Mappers/parroquia';
import { CrearParroquiaCasoUso } from '../parroquia-caso-uso/crear';
import { LeerParroquiaCasoUso } from '../parroquia-caso-uso/leer';
import { EditarParroquiaCasoUso } from '../parroquia-caso-uso/editar';
import { EliminarParroquiaCasoUso } from '../parroquia-caso-uso/eliminar';
import { CrearParroquiaDto, EditarParroquiaDto, LeerParroquiaDto } from './dto';
import { UbicacionAlias } from '@utils/enums/rutas.enum';

// @UseGuarKds(AuthGuard('jwt'))
@Controller('parroquia')
export class ParroquiaController {
  constructor(
    private readonly _crearParroquiaService: CrearParroquiaCasoUso,
    private readonly _editarParroquiaService: EditarParroquiaCasoUso,
    private readonly _leerParroquiaService: LeerParroquiaCasoUso,
    private readonly _eliminarParroquiaService: EliminarParroquiaCasoUso,
  ) {}
  @Ruta(UbicacionAlias.ParroquiaCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() parroquia: CrearParroquiaDto): Promise<SalidaApi> {
    const respuesta: LeerParroquiaDto = await this._crearParroquiaService.crear(
      ParroquiaMapper.crear(parroquia),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Parroquia creado correctamente`,
    };
  }

  @Ruta(UbicacionAlias.ParroquiaEditar)
  @Patch('editar/:ParroquiaID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() parroquia: EditarParroquiaDto,
    @Param('ParroquiaID', ParseIntPipe) ParroquiaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarParroquiaService.editar(
      ParroquiaMapper.editar(parroquia),
      ParroquiaID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Parroquia editado correctamente`,
    };
  }

  @Get('obtener/:ParroquiaID')
  async obtenerPorId(
    @Param('ParroquiaID', ParseIntPipe) ParroquiaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerParroquiaService.obtenerProId(
      ParroquiaID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerParroquiaDto[] = await this._leerParroquiaService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(UbicacionAlias.ParroquiaPaginado)
  @Get('obtener/parroquias/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerParroquiaService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(UbicacionAlias.ParroquiaElmininar)
  @Delete('eliminar/:ParroquiaID')
  async eliminar(
    @Param('ParroquiaID') ParroquiaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._eliminarParroquiaService.eliminar(
      ParroquiaID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Parroquia Eliminado correctamente',
    };
  }
}
