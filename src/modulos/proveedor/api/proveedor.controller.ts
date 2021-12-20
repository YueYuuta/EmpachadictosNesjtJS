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
import { CrearProveedorCasoUso } from '../proveedor-caso-uso/crear';
import { EditarProveedorCasoUso } from '../proveedor-caso-uso/editar';
import { EliminarProveedorCasoUso } from '../proveedor-caso-uso/eliminar';
import { LeerProveedorCasoUso } from '../proveedor-caso-uso/leer';
import { CrearProveedorDto } from './dto/crear-proveedor.dto';
import { LeerProveedorDto } from './dto/leer-proveedor.dto';
import { ProveedorMapper } from '@utils/Mappers/proveedor';
import { EditarProveedorDto } from './dto/editar-proveedor.dto';
import { ClienteAlias } from '@utils/enums/rutas.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('proveedor')
export class ProveedorController {
  constructor(
    private readonly _crearProveedorService: CrearProveedorCasoUso,
    private readonly _editarProveedorService: EditarProveedorCasoUso,
    private readonly _leerProveedorService: LeerProveedorCasoUso,
    private readonly _eliminarProveedorService: EliminarProveedorCasoUso,
  ) {}
  @Ruta(ClienteAlias.ProveedorCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() proveedor: CrearProveedorDto): Promise<SalidaApi> {
    const respuesta: LeerProveedorDto = await this._crearProveedorService.crear(
      ProveedorMapper.crear(proveedor),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Proveedor creado correctamente`,
    };
  }

  @Ruta(ClienteAlias.ProveedorEditar)
  @Patch('editar/:ProveedorID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() proveedor: EditarProveedorDto,
    @Param('ProveedorID', ParseIntPipe) ProveedorID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarProveedorService.editar(
      ProveedorMapper.editar(proveedor),
      ProveedorID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Proveedor editado correctamente`,
    };
  }

  @Get('obtener/:ProveedorID')
  async obtenerPorId(
    @Param('ProveedorID', ParseIntPipe) ProveedorID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProveedorService.obtenerProId(
      ProveedorID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ClienteAlias.ProveedorPaginado)
  @Get('obtener/proveedors/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerProveedorService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ClienteAlias.ProveedorElmininar)
  @Delete('eliminar/:ProveedorID')
  async eliminar(
    @Param('ProveedorID') ProveedorID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._eliminarProveedorService.eliminar(
      ProveedorID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Proveedor Eliminado correctamente',
    };
  }
}
