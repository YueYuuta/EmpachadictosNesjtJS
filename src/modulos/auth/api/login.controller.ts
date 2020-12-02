import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginCasoUso } from '../login-caso-uso/login';
import { HttpStatus } from '@nestjs/common';
import { SalidaApi } from '@modulos/shared/models/salida-api';
import { AuthGuard } from '@nestjs/passport';
import { ObtenerUsuario } from '@modulos/usuario/decoradores/obtenerUsuario';
import { TokenCasoUso } from '../login-caso-uso/refrescar-token';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _loginService: LoginCasoUso,
    private readonly _tokenService: TokenCasoUso,
  ) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() usuario: LoginDto): Promise<SalidaApi> {
    const respuesta = await this._loginService.login(usuario);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('refrescar/usuario/token')
  async obtenerUsuarioToken(@ObtenerUsuario() user: any): Promise<any> {
    const respuesta = await this._tokenService.refrescar(user.UsuarioID);
    return {
      status: HttpStatus.OK,
      data: respuesta,
    };
  }
}
