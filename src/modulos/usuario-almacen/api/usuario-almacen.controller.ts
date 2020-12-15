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
import { CrearUsuarioAlmacenCasoUso } from '../usuario-almacen-caso-uso/crear';
import { EditarUsuarioAlmacenCasoUso } from '../usuario-almacen-caso-uso/editar';
import { LeerUsuarioAlmacenCasoUso } from '../usuario-almacen-caso-uso/leer';
import { EliminarUsuarioAlmacenCasoUso } from '../usuario-almacen-caso-uso/eliminar';
import {
  CrearUsuarioAlmacenDto,
  EditarUsuarioAlmacenDto,
  LeerUsuarioAlmacenDto,
} from './dto';
import { SalidaApi } from '@modulos/shared/models/salida-api';
import { UsuarioAlmacenMapper } from '@utils/Mappers/usuario-almacen';
import { ObtenerUsuario } from '@modulos/usuario/decoradores/obtenerUsuario';
import { Ruta } from '@modulos/shared/decorador/ruta.decorador';
import { RoleGuard } from '../../rol/guard/ruta.guard';
import { ConfiguracionAlias } from '@utils/enums/rutas.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('usuario-almacen')
export class UsuarioAlmacenController {
  constructor(
    private readonly _crearUsuarioAlmacenService: CrearUsuarioAlmacenCasoUso,
    private readonly _editarUsuarioAlmacenService: EditarUsuarioAlmacenCasoUso,
    private readonly _leerUsuarioAlmacenService: LeerUsuarioAlmacenCasoUso,
    private readonly _eliminarUsuarioAlmacenService: EliminarUsuarioAlmacenCasoUso,
  ) {}

  @Ruta(ConfiguracionAlias.UsuarioAlmacenCrear)
  // @UseGuards(RoleGuard)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(
    @Body() usuarioAlmacen: CrearUsuarioAlmacenDto,
  ): Promise<SalidaApi> {
    const respuesta: LeerUsuarioAlmacenDto = await this._crearUsuarioAlmacenService.crear(
      usuarioAlmacen,
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Usuario almacen creado correctamente`,
    };
  }

  @Ruta(ConfiguracionAlias.UsuarioAlmacenEditar)
  // @UseGuards(RoleGuard)
  @Patch('editar/:UsuarioAlmacenID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() usuarioAlmacen: EditarUsuarioAlmacenDto,
    @Param('UsuarioAlmacenID', ParseIntPipe) UsuarioAlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarUsuarioAlmacenService.editar(
      UsuarioAlmacenMapper.editar(usuarioAlmacen),
      UsuarioAlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Usuario almacen editado correctamente`,
    };
  }

  // @UseGuards(RoleGuard)
  @Get('obtener/:UsuarioALmacenID')
  async obtenerPorId(
    @Param('UsuarioALmacenID', ParseIntPipe) UsuarioAlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioAlmacenService.obtenerProId(
      UsuarioAlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('guard/frontend/usuario-almacen/:AlmacenID')
  async guardAlmacenFrontEnd(
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
    @ObtenerUsuario() usuario: any,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioAlmacenService.validarExiste(
      usuario.UsuarioID,
      AlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ConfiguracionAlias.UsuarioAlmacenPaginado)
  // @UseGuards(RoleGuard)
  @Get('obtener/paginado/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioAlmacenService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  // @UseGuards(RoleGuard)
  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerUsuarioAlmacenDto[] = await this._leerUsuarioAlmacenService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  // @Get('obtener/almacenes/table/input/:termino')
  // async obtenerPorBusqueda(
  //   @Param('termino') termino: string,
  // ): Promise<SalidaApi> {
  //   const respuesta = await this._leerUsuarioAlmacenService.obtenerProBusqueda(
  //     termino,
  //   );
  //   return {
  //     status: HttpStatus.OK,
  //     data: respuesta,
  //   };
  // }
  @Ruta(ConfiguracionAlias.UsuarioAlmacenPorUsuario)
  // @UseGuards(RoleGuard)
  @Get('obtener/usuario/:desde/:limite/:termino?')
  async obtenerPorUsuario(
    @ObtenerUsuario() usuario: any,
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioAlmacenService.obtenerPorUsuario(
      usuario.UsuarioID,
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }
  @Get('obtener/almacen/:AlmacenID')
  async obtenerPorAlmacen(
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioAlmacenService.obtenerPorAlmacen(
      AlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ConfiguracionAlias.UsuarioAlmacenElmininar)
  // @UseGuards(RoleGuard)
  @Delete('eliminar/:UsuarioAlmacenID')
  async eliminar(
    @Param('UsuarioAlmacenID') usuarioAlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._eliminarUsuarioAlmacenService.eliminar(
      usuarioAlmacenID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Almacen Eliminado correctamente',
    };
  }
}
