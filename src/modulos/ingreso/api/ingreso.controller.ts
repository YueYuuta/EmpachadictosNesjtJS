import { Ruta } from '@modulos/shared/decorador/ruta.decorador';
import { SalidaApi } from '@modulos/shared/models/salida-api';
import { ObtenerUsuario } from '@modulos/usuario/decoradores/obtenerUsuario';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpStatus,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductoAlias } from '@utils/enums/rutas.enum';

import { IngresoMapper } from '@utils/Mappers/ingreso';
import { CrearIngresoCasoUso } from '../ingreso-caso-uso/crear';
import { EditarIngresoCasoUso } from '../ingreso-caso-uso/editar';
import { CrearIngresoDto, EditarIngresoDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('ingreso')
export class IngresoController {
  constructor(
    private readonly _crearIngresoService: CrearIngresoCasoUso,
    private readonly _editarIngresoService: EditarIngresoCasoUso, // private readonly _leerIngresoService: LeerIngresoCasoUso, // private readonly _editarIngresoService: EditarIngresoCasoUso,
  ) {}
  @Ruta(ProductoAlias.IngresoCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(
    @Body() ingreso: CrearIngresoDto,
    @ObtenerUsuario() usuario: any,
  ): Promise<SalidaApi> {
    // this._ingresoGateway.sendToAll('hola como estas');
    const respuesta = await this._crearIngresoService.crear(
      IngresoMapper.crear(ingreso, usuario.UsuarioID),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Ingreso creado correctamente`,
    };
  }

  @Ruta(ProductoAlias.IngresoEditar)
  @Patch('editar/:IngresoID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() ingreso: EditarIngresoDto,
    // @ObtenerUsuario() usuario: any,
    @Param('IngresoID', ParseIntPipe) IngresoID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarIngresoService.editar(
      IngresoMapper.editar(ingreso),
      IngresoID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Ingreso editado correctamente`,
    };
  }

  // // @Patch('crear/imagen/:ProductoID/:tipo')
  // // async crearImagen(
  // //   @Param('ProductoID', ParseIntPipe) ProductoID: number,
  // //   @Param('tipo') tipo: string,
  // //   @Request() req: any,
  // // ): Promise<SalidaApi> {
  // //   console.log(ProductoID, req.files);
  // //   const respuesta = await this._crearMenuService.crearImagen(
  // //     ProductoID,
  // //     req,
  // //     tipo,
  // //   );
  // //   return {
  // //     status: HttpStatus.OK,
  // //     data: respuesta,
  // //     message: `Imagen guardada correctamente`,
  // //   };
  // // }

  // @Get('obtener/:IngresoID')
  // async obtenerPorId(
  //   @Param('IngresoID', ParseIntPipe) IngresoID: number,
  // ): Promise<SalidaApi> {
  //   const respuesta = await this._leerIngresoService.obtenerProId(IngresoID);
  //   return {
  //     status: HttpStatus.OK,
  //     data: respuesta,
  //   };
  // }

  // // @Ruta(ProductoAlias.MenuPaginado)
  // // @Get('obtener/menus/:desde/:limite/:termino?')
  // // async ObtenerPaginado(
  // //   @Param('desde', ParseIntPipe) desde: number,
  // //   @Param('limite', ParseIntPipe) limite: number,
  // //   @Param('termino') termino: string,
  // // ): Promise<SalidaApi> {
  // //   const respuesta = await this._leerMenuService.obtenerPaginado(
  // //     desde,
  // //     limite,
  // //     termino,
  // //   );
  // //   return {
  // //     status: HttpStatus.OK,
  // //     data: respuesta,
  // //   };
  // // }

  // // @Ruta(ProductoAlias.MenuPaginado)
  // // @Get('obtener/menus-por-categoria/:desde/:limite/:CategoriaID/:termino?')
  // // async ObtenerPaginadoPorCategoria(
  // //   @Param('desde', ParseIntPipe) desde: number,
  // //   @Param('limite', ParseIntPipe) limite: number,
  // //   @Param('termino') termino: string,
  // //   @Param('CategoriaID') CategoriaID: number,
  // // ): Promise<SalidaApi> {
  // //   const respuesta = await this._leerMenuService.obtenerPaginadoPorCategoria(
  // //     desde,
  // //     limite,
  // //     CategoriaID,
  // //     termino,
  // //   );
  // //   return {
  // //     status: HttpStatus.OK,
  // //     data: respuesta,
  // //   };
  // // }

  // // @Ruta(ProductoAlias.MenuElmininar)
  // // @Delete('eliminar/:MenuID')
  // // async eliminar(@Param('MenuID') MenuID: number): Promise<SalidaApi> {
  // //   const respuesta = await this._eliminarMenuService.eliminar(MenuID);
  // //   return {
  // //     status: HttpStatus.OK,
  // //     data: respuesta,
  // //     message: 'Menu Eliminado correctamente',
  // //   };
  // // }
}
