import { CrearAlmacenCasoUso } from '../almacen-caso-uso/crear';
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
import { EditarAlmacenCasoUso } from '../almacen-caso-uso/editar';
import { LeerAlmacenCasoUso } from '../almacen-caso-uso/leer';
import { CrearAlmacenDto, LeerAlmacenDto, EditarAlmacenDto } from './dto';
import { SalidaApi } from '@modulos/shared/models/salida-api';
import { AlmacenMapper } from '@utils/Mappers/almacen';
import { EliminarAlmacenCasoUso } from '../almacen-caso-uso/eliminar';

@UseGuards(AuthGuard('jwt'))
@Controller('almacen')
export class AlmacenController {
  constructor(
    private readonly _crearAlmacenService: CrearAlmacenCasoUso,
    private readonly _editarAlmacenService: EditarAlmacenCasoUso,
    private readonly _leerAlmacenService: LeerAlmacenCasoUso,
    private readonly _eliminarAlmacenService: EliminarAlmacenCasoUso,
  ) {}

  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() almacen: CrearAlmacenDto): Promise<SalidaApi> {
    const respuesta: LeerAlmacenDto = await this._crearAlmacenService.crear(
      almacen,
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Almacen creado correctamente`,
    };
  }

  @Patch('editar/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() almacen: EditarAlmacenDto,
    @Param('id', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarAlmacenService.editar(
      AlmacenMapper.editar(almacen),
      AlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Almacen editado correctamente`,
    };
  }

  @Get('obtener/:id')
  async obtenerPorId(
    @Param('id', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerAlmacenService.obtenerProId(AlmacenID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener/almacenes/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    console.log('hola');
    const respuesta = await this._leerAlmacenService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerAlmacenDto[] = await this._leerAlmacenService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  // @Get('obtener/almacenes/table/input/:termino')
  // async obtenerPorBusqueda(
  //   @Param('termino') termino: string,
  // ): Promise<SalidaApi> {
  //   const respuesta = await this._leerAlmacenService.obtenerProBusqueda(
  //     termino,
  //   );
  //   return {
  //     status: HttpStatus.OK,
  //     data: respuesta,
  //   };
  // }
  @Delete('eliminar/:id')
  async eliminar(@Param('id') AlmacenID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarAlmacenService.eliminar(AlmacenID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Almacen Eliminado correctamente',
    };
  }
}
