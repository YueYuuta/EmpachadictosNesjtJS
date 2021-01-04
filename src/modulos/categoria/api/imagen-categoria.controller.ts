import { Controller, Param, Get, Res } from '@nestjs/common';

import { LeerCategoriaCasoUso } from '../categoria-caso-uso/leer';

@Controller('imagen-categoria')
export class ImagenCategoriaController {
  constructor(private readonly _leerCategoriaService: LeerCategoriaCasoUso) {}

  @Get('mostrar/imagen/:img')
  async serveImagen(@Param('img') img: string, @Res() res: any): Promise<any> {
    const ruta: string = await this._leerCategoriaService.obtenerImagen(img);
    res.sendFile(img, { root: ruta });
  }
}
