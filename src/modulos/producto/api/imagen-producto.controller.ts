import { Controller, Param, Get, Res } from '@nestjs/common';

import { LeerProductoCasoUso } from '../producto-caso-uso/leer';

@Controller('imagen-producto')
export class ImagenProductoController {
  constructor(private readonly _leerProductoService: LeerProductoCasoUso) {}

  @Get('mostrar/imagen/:img')
  async serveAvatar(@Param('img') img: string, @Res() res: any): Promise<any> {
    const ruta: string = await this._leerProductoService.obtenerImagen(img);
    res.sendFile(img, { root: ruta });
  }
}
