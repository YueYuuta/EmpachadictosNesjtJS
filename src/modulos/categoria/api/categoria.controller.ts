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

import { CategoriaMapper } from '@utils/Mappers/categoria';

import { ProductoAlias } from '@utils/enums/rutas.enum';
import { CrearCategoriaCasoUso } from '../categoria-caso-uso/crear';
import { LeerCategoriaCasoUso } from '../categoria-caso-uso/leer';
import { EditarCategoriaCasoUso } from '../categoria-caso-uso/editar';
import { EliminarCategoriaCasoUso } from '../categoria-caso-uso/eliminar';
import { CrearCategoriaDto, EditarCategoriaDto, LeerCategoriaDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('categoria')
export class CategoriaController {
  constructor(
    private readonly _crearCategoriaService: CrearCategoriaCasoUso,
    private readonly _editarCategoriaService: EditarCategoriaCasoUso,
    private readonly _leerCategoriaService: LeerCategoriaCasoUso,
    private readonly _eliminarCategoriaService: EliminarCategoriaCasoUso,
  ) {}
  @Ruta(ProductoAlias.CategoriaCrear)
  @Post('crear')
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() categoria: CrearCategoriaDto): Promise<SalidaApi> {
    const respuesta: LeerCategoriaDto = await this._crearCategoriaService.crear(
      CategoriaMapper.crear(categoria),
    );
    return {
      status: HttpStatus.CREATED,
      data: respuesta,
      message: `Categoria creado correctamente`,
    };
  }

  @Ruta(ProductoAlias.CategoriaEditar)
  @Patch('editar/:CategoriaID')
  @UsePipes(new ValidationPipe({ transform: true }))
  async editar(
    @Body() categoria: EditarCategoriaDto,
    @Param('CategoriaID', ParseIntPipe) CategoriaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._editarCategoriaService.editar(
      CategoriaMapper.editar(categoria),
      CategoriaID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: `Categoria editado correctamente`,
    };
  }

  @Get('obtener/:CategoriaID')
  async obtenerPorId(
    @Param('CategoriaID', ParseIntPipe) CategoriaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerCategoriaService.obtenerProId(
      CategoriaID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Get('obtener')
  async obtener(): Promise<SalidaApi> {
    const respuesta: LeerCategoriaDto[] = await this._leerCategoriaService.obtener();
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.CategoriaPaginado)
  @Get('obtener/categorias/:desde/:limite/:termino?')
  async ObtenerPaginado(
    @Param('desde', ParseIntPipe) desde: number,
    @Param('limite', ParseIntPipe) limite: number,
    @Param('termino') termino: string,
  ): Promise<SalidaApi> {
    const respuesta = await this._leerCategoriaService.obtenerPaginado(
      desde,
      limite,
      termino,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @Ruta(ProductoAlias.CategoriaElmininar)
  @Delete('eliminar/:CategoriaID')
  async eliminar(
    @Param('CategoriaID') CategoriaID: number,
  ): Promise<SalidaApi> {
    const respuesta = await this._eliminarCategoriaService.eliminar(
      CategoriaID,
    );
    return {
      status: HttpStatus.OK,
      data: respuesta,
      message: 'Categoria Eliminado correctamente',
    };
  }
}
