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

import { PlanMapper } from '@utils/Mappers/plan';
import { CrearPlanDto, EditarPlanDto, LeerPlanDto } from './dto';
import { PlanAlias } from '@utils/enums/rutas.enum';
import { CrearPlanCasoUso } from '../plan-caso-uso/crear';
import { EditarPlanCasoUso } from '../plan-caso-uso/editar';
import { LeerPlanCasoUso } from '../plan-caso-uso/leer';
import { EliminarPlanCasoUso } from '../plan-caso-uso/eliminar';

// @UseGuarKds(AuthGuard('jwt'))
@Controller('plan')
export class PlanController {
  constructor(
    private readonly _crearPlanService: CrearPlanCasoUso,
    private readonly _editarPlanService: EditarPlanCasoUso,
    private readonly _leerPlanService: LeerPlanCasoUso,
    private readonly _eliminarPlanService: EliminarPlanCasoUso,
  ) {}
  @Ruta(PlanAlias.PlanCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() plan: CrearPlanDto): Promise<SalidaApi> {
    const respuesta: LeerPlanDto = await this._crearPlanService.crear(
      PlanMapper.crear(plan),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Plan creado correctamente`,
    };
  }

  @Ruta(PlanAlias.PlanEditar)
  @Patch('editar/:PlanID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() plan: EditarPlanDto,
    @Param('PlanID', ParseIntPipe) PlanID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarPlanService.editar(
      PlanMapper.editar(plan),
      PlanID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Plan editado correctamente`,
    };
  }

  @Get('obtener/:PlanID')
  async obtenerPorId(
    @Param('PlanID', ParseIntPipe) PlanID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerPlanService.obtenerProId(PlanID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerPlanDto[] = await this._leerPlanService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(PlanAlias.PlanPaginado)
  @Get('obtener/plans/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerPlanService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(PlanAlias.PlanElmininar)
  @Delete('eliminar/:PlanID')
  async eliminar(@Param('PlanID') PlanID: number): Promise<SalidaApi> {
    const respuesta = await this._eliminarPlanService.eliminar(PlanID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Plan Eliminado correctamente',
    };
  }
}
