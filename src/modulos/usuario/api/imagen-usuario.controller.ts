import { Controller, Param, Get, Res } from '@nestjs/common';

import { LeerUsuarioCasoUso } from '../usuario-caso-uso/leer';

@Controller('imagen-usuario')
export class ImagenUsuarioController {
  constructor(private readonly _leerUsuarioService: LeerUsuarioCasoUso) {}

  @Get('mostrar/avatar/:img')
  async serveAvatar(@Param('img') img: string, @Res() res: any): Promise<any> {
    const ruta: string = await this._leerUsuarioService.getAvatar(img);
    res.sendFile(img, { root: ruta });
  }
}
