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
import { CrearClienteCasoUso } from '../cliente-caso-uso/crear';
import { EditarClienteCasoUso } from '../cliente-caso-uso/editar';
import { EliminarClienteCasoUso } from '../cliente-caso-uso/eliminar';
import { LeerClienteCasoUso } from '../cliente-caso-uso/leer';
import { CrearClienteDto } from './dto/crear-cliente.dto';
import { LeerClienteDto } from './dto/leer-cliente.dto';
import { ClienteMapper } from '@utils/Mappers/cliente';
import { EditarClienteDto } from './dto/editar-cliente.dto';
import { ClienteAlias } from '@utils/enums/rutas.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly _crearClienteService: CrearClienteCasoUso,
    private readonly _editarClienteService: EditarClienteCasoUso,
    private readonly _leerClienteService: LeerClienteCasoUso,
    private readonly _eliminarClienteService: EliminarClienteCasoUso,
  ) {}
  @Ruta(ClienteAlias.ClienteCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() cliente: CrearClienteDto): Promise<SalidaApi> {
    const respuesta: LeerClienteDto = await this._crearClienteService.crear(
      ClienteMapper.crear(cliente),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Cliente creado correctamente`,
    };
  }

  @Ruta(ClienteAlias.ClienteEditar)
  @Patch('editar/:ClienteID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() cliente: EditarClienteDto,
    @Param('ClienteID', ParseIntPipe) ClienteID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarClienteService.editar(
      ClienteMapper.editar(cliente),
      ClienteID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Cliente editado correctamente`,
    };
  }

  @Get('obtener/:ClienteID')
  async obtenerPorId(
    @Param('ClienteID', ParseIntPipe) ClienteID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerClienteService.obtenerProId(ClienteID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ClienteAlias.ClientePaginado)
  @Get('obtener/clientes/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerClienteService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ClienteAlias.ClienteElmininar)
  @Delete('eliminar/:ClienteID')
  async eliminar(@Param('ClienteID') ClienteID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarClienteService.eliminar(ClienteID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Cliente Eliminado correctamente',
    };
  }
}
