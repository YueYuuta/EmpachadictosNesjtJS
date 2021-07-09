import { Ruta } from '@modulos/shared/decorador/ruta.decorador';
import { SalidaApi } from '@modulos/shared/models/salida-api';
import { ObtenerUsuario } from '@modulos/usuario/decoradores/obtenerUsuario';
import {
  Controller,
  Param,
  ParseIntPipe,
  Get,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { DespacharGateway } from '../gateway/pedido.gateway';
import { LeerDespacharCasoUso } from '../pedido-caso-uso/leer';

@UseGuards(AuthGuard('jwt'))
@Controller('despachar')
export class DespacharController {
  constructor(
    private readonly _leerDespacharService: LeerDespacharCasoUso,
    private readonly _pedidoGateway: DespacharGateway,
  ) {}

  // @Ruta(ProductoAlias.MenuEditar)
  // @Patch('editar/:MenuID')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async editar(
  //   @Body() menu: EditarMenuDto,
  //   @Param('MenuID', ParseIntPipe) MenuID: number,
  // ): Promise<SalidaApi> {
  //   const respuesta = await this._editarMenuService.editar(
  //     MenuMapper.editar(menu),
  //     MenuID,
  //   );
  //   return {
  //     status: HttpStatus.OK,
  //     data: respuesta,
  //     message: `Menu editado correctamente`,
  //   };
  // }

  // @Patch('crear/imagen/:ProductoID/:tipo')
  // async crearImagen(
  //   @Param('ProductoID', ParseIntPipe) ProductoID: number,
  //   @Param('tipo') tipo: string,
  //   @Request() req: any,
  // ): Promise<SalidaApi> {
  //   console.log(ProductoID, req.files);
  //   const respuesta = await this._crearMenuService.crearImagen(
  //     ProductoID,
  //     req,
  //     tipo,
  //   );
  //   return {
  //     status: HttpStatus.OK,
  //     data: respuesta,
  //     message: `Imagen guardada correctamente`,
  //   };
  // }

  @Get('obtener-todo/:AlmacenID')
  async obtenerTodos(
    @Param('AlmacenID', ParseIntPipe) AlmacenID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerDespacharService.obtenerTodos(AlmacenID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener-por-id/:DespacharID')
  async obtenerPorId(
    @Param('DespacharID', ParseIntPipe) DespacharID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerDespacharService.obtenerProId(
      DespacharID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  // @Ruta(ProductoAlias.MenuPaginado)
  // @Get('obtener/menus/:desde/:limite/:termino?')
  // async ObtenerPaginado(
  //   @Param('desde', ParseIntPipe) desde: number,
  //   @Param('limite', ParseIntPipe) limite: number,
  //   @Param('termino') termino: string,
  // ): Promise<SalidaApi> {
  //   const respuesta = await this._leerMenuService.obtenerPaginado(
  //     desde,
  //     limite,
  //     termino,
  //   );
  //   return {
  //     status: HttpStatus.OK,
  //     data: respuesta,
  //   };
  // }

  // @Ruta(ProductoAlias.MenuPaginado)
  // @Get('obtener/menus-por-categoria/:desde/:limite/:CategoriaID/:termino?')
  // async ObtenerPaginadoPorCategoria(
  //   @Param('desde', ParseIntPipe) desde: number,
  //   @Param('limite', ParseIntPipe) limite: number,
  //   @Param('termino') termino: string,
  //   @Param('CategoriaID') CategoriaID: number,
  // ): Promise<SalidaApi> {
  //   const respuesta = await this._leerMenuService.obtenerPaginadoPorCategoria(
  //     desde,
  //     limite,
  //     CategoriaID,
  //     termino,
  //   );
  //   return {
  //     status: HttpStatus.OK,
  //     data: respuesta,
  //   };
  // }

  // @Ruta(ProductoAlias.MenuElmininar)
  // @Delete('eliminar/:MenuID')
  // async eliminar(@Param('MenuID') MenuID: number): Promise<SalidaApi> {
  //   const respuesta = await this._eliminarMenuService.eliminar(MenuID);
  //   return {
  //     status: HttpStatus.OK,
  //     data: respuesta,
  //     message: 'Menu Eliminado correctamente',
  //   };
  // }
}
