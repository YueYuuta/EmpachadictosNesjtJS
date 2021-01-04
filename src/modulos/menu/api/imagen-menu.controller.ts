import { Controller, Param, Get, Res } from '@nestjs/common';

import { LeerMenuCasoUso } from '../menu-caso-uso/leer';

@Controller('imagen-menu')
export class ImagenMenuController {
  constructor(private readonly _leerMenuService: LeerMenuCasoUso) {}

  @Get('mostrar/imagen/:img')
  async serveAvatar(@Param('img') img: string, @Res() res: any): Promise<any> {
    const ruta: string = await this._leerMenuService.obtenerImagen(img);
    res.sendFile(img, { root: ruta });
  }
}
