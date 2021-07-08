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

import { MesaMapper } from '@utils/Mappers/mesa';
import { CrearMesaDto, EditarMesaDto, LeerMesaDto } from './dto';
import { ConfiguracionAlias } from '@utils/enums/rutas.enum';
import { CrearMesaCasoUso } from '../mesa-caso-uso/crear';
import { EditarMesaCasoUso } from '../mesa-caso-uso/editar';
import { LeerMesaCasoUso } from '../mesa-caso-uso/leer';
import { EliminarMesaCasoUso } from '../mesa-caso-uso/eliminar';
import { CambiarMesaDto } from './dto/cambiar-mesa.dto';
import { MesaGateway } from '../gateway/mesa.gateway';

@UseGuards(AuthGuard('jwt'))
@Controller('mesa')
export class MesaController {
  constructor(
    private readonly _crearMesaService: CrearMesaCasoUso,
    private readonly _editarMesaService: EditarMesaCasoUso,
    private readonly _leerMesaService: LeerMesaCasoUso,
    private readonly _eliminarMesaService: EliminarMesaCasoUso,
    private readonly _mesaGateway: MesaGateway,
  ) {}
  @Ruta(ConfiguracionAlias.MesaCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() plan: CrearMesaDto): Promise<SalidaApi> {
    const respuesta: LeerMesaDto = await this._crearMesaService.crear(
      MesaMapper.crear(plan),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Mesa creado correctamente`,
    };
  }

  @Ruta(ConfiguracionAlias.MesaEditar)
  @Patch('editar/:MesaID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() plan: EditarMesaDto,
    @Param('MesaID', ParseIntPipe) MesaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarMesaService.editar(
      MesaMapper.editar(plan),
      MesaID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Mesa editado correctamente`,
    };
  }

  // @Ruta(ConfiguracionAlias.MesaEditar)
  @Patch('ocupar-mesa/:MesaID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async ocuparMesa(
    @Body() mesa: CambiarMesaDto,
    @Param('MesaID', ParseIntPipe) MesaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._crearMesaService.OcuparMesa(mesa, MesaID);

    const mesaDb = await this._leerMesaService.obtenerProId(MesaID);
    this._mesaGateway.emitirEventoCambioOcupado(mesaDb);

    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Mesa asignada correctamente`,
    };
  }

  @Get('obtener-id/:MesaID')
  async obtenerPorId(
    @Param('MesaID', ParseIntPipe) MesaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerMesaService.obtenerProId(MesaID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener-todo/:AlmacenID')
  async obtener(
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta: LeerMesaDto[] = await this._leerMesaService.obtener(
      AlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ConfiguracionAlias.MesaPaginado)
  @Get('obtener/plans/:AlmacenID/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerMesaService.obtenerPaginado(
      AlmacenID,
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ConfiguracionAlias.MesaElmininar)
  @Delete('eliminar/:MesaID')
  async eliminar(@Param('MesaID') MesaID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarMesaService.eliminar(MesaID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Mesa Eliminado correctamente',
    };
  }
}
