import { Ruta } from '@modulos/shared/decorador/ruta.decorador';
import { SalidaApi } from '@modulos/shared/models/salida-api';
import { ObtenerUsuario } from '@modulos/usuario/decoradores/obtenerUsuario';
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
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductoAlias } from '@utils/enums/rutas.enum';
import { MenuMapper } from '@utils/Mappers/menu';
import { PedidoMapper } from '@utils/Mappers/pedido';
import { PedidoGateway } from '../gateway/pedido.gateway';
import { CrearPedidoCasoUso } from '../pedido-caso-uso/crear';
import { CrearPedidoDto, LeerPedidoDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('pedido')
export class PedidoController {
  constructor(private readonly _crearPedidoService: CrearPedidoCasoUso) {}
  @Ruta(ProductoAlias.MenuCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(
    @Body() pedido: CrearPedidoDto,
    @ObtenerUsuario() usuario: any,
  ): Promise<SalidaApi> {
    // this._pedidoGateway.sendToAll('hola como estas');
    const respuesta = await this._crearPedidoService.crear(
      PedidoMapper.crear(pedido, usuario.UsuarioID),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Pedido creado correctamente`,
    };
  }

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

  // @Get('obtener/:MenuID')
  // async obtenerPorId(
  //   @Param('MenuID', ParseIntPipe) MenuID: number,
  // ): Promise<SalidaApi> {
  //   const respuesta = await this._leerMenuService.obtenerProId(MenuID);
  //   return {
  //     status: HttpStatus.OK,
  //     data: respuesta,
  //   };
  // }

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
