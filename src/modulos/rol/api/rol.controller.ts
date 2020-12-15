import { SalidaApi } from '@modulos/shared/models/salida-api';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CrearRolDto } from './dto/crear-rol.dto';
import { LeerRolDto } from './dto/leer-rol.dto';
import { CrearRoleCasoUso } from '../role-caso-uso/crear';
import { EditarRoleCasoUso } from '../role-caso-uso/editar';
import { EliminarRolCasoUso } from '../role-caso-uso/eliminar';
import { LeerRolCasoUso } from '../role-caso-uso/leer';
import { Ruta } from '@modulos/shared/decorador/ruta.decorador';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../guard/ruta.guard';
import { ObtenerUsuario } from '@modulos/usuario/decoradores/obtenerUsuario';
import { ConfiguracionAlias } from '../../../utils/enums/rutas.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('rol')
export class RolController {
  constructor(
    private readonly _crearRolService: CrearRoleCasoUso,
    private readonly _editarRolService: EditarRoleCasoUso,
    private readonly _eliminarRolService: EliminarRolCasoUso,
    private readonly _leerRolService: LeerRolCasoUso,
  ) {}

  @Ruta(ConfiguracionAlias.RolCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() rol: CrearRolDto): Promise<SalidaApi> {
    const respuesta: LeerRolDto = await this._crearRolService.crear(rol);
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Rol creado correctamente`,
    };
  }

  @Ruta(ConfiguracionAlias.RolEditar)
  @Patch('editar/:RolID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() rol: CrearRolDto,
    @Param('RolID', ParseIntPipe) RolID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarRolService.editar(RolID, rol);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Rol editado correctamente`,
    };
  }
  @Ruta(ConfiguracionAlias.RolElmininar)
  @Delete('eliminar/:RolID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async eliminar(
    @Param('RolID', ParseIntPipe) RolID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._eliminarRolService.eliminar(RolID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Rol eliminado correctamente`,
    };
  }

  @Get('obtener/:RolID')
  async obtenerPorId(
    @Param('RolID', ParseIntPipe) RolID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerRolService.obtenerPorId(RolID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('guard/frontend')
  async obtenerRolGuardFront(
    @ObtenerUsuario() usuario: any,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerRolService.obtenerPorId(
      usuario.Rol.RolID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }
  @Ruta(ConfiguracionAlias.RolPaginado)
  @Get('obtener/roles/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerRolService.obtenerPaginado(
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
    const respuesta = await this._leerRolService.obtenerRoles();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener/todos/permisos')
  async obtenerPermisos(): Promise<SalidaApi> {
    const respuesta = await this._leerRolService.obtenerPermisos();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }
}
