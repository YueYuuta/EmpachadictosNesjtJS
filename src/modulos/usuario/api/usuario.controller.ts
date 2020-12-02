import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Request,
  Patch,
  Param,
  ParseIntPipe,
  Get,
  UseGuards,
  Delete,
  Res,
} from '@nestjs/common';
import { CrearUsuarioCasoUso } from '../usuario-caso-uso/crear';
import { LeerUsuarioDto } from '../api/dto/leer-usuario.dto';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ValidarRole } from '../pipe/role.pipe';
import { UserMapper } from '@utils/Mappers/User';
import { EditarUsuarioCasoUso } from '../usuario-caso-uso/editar';
import { EditarUsuarioDto } from './dto/editar-usuario.dto';
import { ResetContraseñaDto } from './dto/resetear-contraseña.dto';
import { ResetearContraseñaCasoUso } from '../usuario-caso-uso/resetear-contraseña';
import { HttpStatus } from '@nestjs/common';
import { SalidaApi } from '@modulos/shared/models/salida-api';
import { AuthGuard } from '@nestjs/passport';
import { LeerUsuarioCasoUso } from '../usuario-caso-uso/leer';
import { EliminarUsuarioCasoUso } from '../usuario-caso-uso/eliminar';
import { ObtenerUsuario } from '../decoradores/obtenerUsuario';
@UseGuards(AuthGuard('jwt'))
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly _crearUsuarioService: CrearUsuarioCasoUso,
    private readonly _editarUsuarioService: EditarUsuarioCasoUso,
    private readonly _resetearContraService: ResetearContraseñaCasoUso,
    private readonly _leerUsuarioService: LeerUsuarioCasoUso,
    private readonly _eliminarUsuarioService: EliminarUsuarioCasoUso,
  ) {}

  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(
    @Request() req: any,
    @Body(ValidarRole) usuario: CrearUsuarioDto,
  ): Promise<SalidaApi> {
    const respuesta: LeerUsuarioDto = await this._crearUsuarioService.crear(
      UserMapper.crear(usuario),
      req,
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Usuario creado correctamente`,
    };
  }

  @Patch('editar/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body(ValidarRole) usuario: EditarUsuarioDto,
    @Param('id', ParseIntPipe) UsuarioID: number,
    @Request() req: any,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarUsuarioService.editar(
      UserMapper.editar(usuario),
      UsuarioID,
      req,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Usuario editado correctamente`,
    };
  }

  @Patch('resetear/contrasena/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetContraseña(
    @Body() usuario: ResetContraseñaDto,
    @Param('id', ParseIntPipe) UsuarioID: number,
  ) {
    const respuesta = await this._resetearContraService.resetear(
      usuario,
      UsuarioID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Contraseña formateada correctamente`,
    };
  }

  @Get('obtener/usuario/:id')
  async obtenerPorId(
    @Param('id', ParseIntPipe) UsuarioID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioService.obtenerProId(UsuarioID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener/usuarios/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioService.obtenerPaginado(
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
    const respuesta = await this._leerUsuarioService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  // @Get('obtener/usuarios/table/input/:termino')
  // async obtenerPorBusqueda(
  //   @Param('termino') termino: string,
  // ): Promise<SalidaApi> {
  //   const respuesta = await this._leerUsuarioService.obtenerProBusqueda(
  //     termino,
  //   );
  //   return {
  //     status: HttpStatus.OK,
  //     data: respuesta,
  //   };
  // }

  @Get('validar/usuario/:usuario')
  async validarUsuario(@Param('usuario') Usuario: string): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioService.validacionUsuario(Usuario);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('validar/usuario/editar/:usuario/:id')
  async validarUsuarioEditar(
    @Param('usuario') Usuario: string,
    @Param('id', ParseIntPipe) UsuarioID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerUsuarioService.validacionUsuarioEditar(
      Usuario,
      UsuarioID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Delete('eliminar/:id')
  async eliminar(
    @Param('id', ParseIntPipe) UsuarioID: number,
    @ObtenerUsuario() Usuario: any,
  ): Promise<SalidaApi> {
    console.log(UsuarioID);
    const respuesta = await this._eliminarUsuarioService.eliminar(
      UsuarioID,
      Usuario.UsuarioID,
    );

    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Usuario eliminado correctamente!',
    };
  }

  @Get('mostrar/avatar/:img')
  async serveAvatar(@Param('img') img: string, @Res() res: any): Promise<any> {
    const ruta: string = await this._leerUsuarioService.getAvatar(img);
    res.sendFile(img, { root: ruta });
  }
}
