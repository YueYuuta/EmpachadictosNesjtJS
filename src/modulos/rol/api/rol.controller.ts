import { SalidaApi } from '@modulos/shared/models/salida-api';
import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CrearRolDto } from './dto/crear-rol.dto';
import { LeerRolDto } from './dto/leer-rol.dto';
import { CrearRoleCasoUso } from '../role-caso-uso/crear';
import { EditarRoleCasoUso } from '../role-caso-uso/editar';
import { EliminarRolCasoUso } from '../role-caso-uso/eliminar';

@Controller('rol')
export class RolController {
  constructor(
    private readonly _crearRolService: CrearRoleCasoUso,
    private readonly _editarRolService: EditarRoleCasoUso,
    private readonly _eliminarRolService: EliminarRolCasoUso,
  ) {}

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
}
