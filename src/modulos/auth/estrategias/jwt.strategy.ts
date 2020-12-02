import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@src/config/config.service';
import { Configuration } from '@src/config/config.keys';
import { IJwtPayload } from '../interface/jwt';
import { UnauthorizedException, Injectable, Inject } from '@nestjs/common';
import { IAuthCasoUso } from '../login-caso-uso/IAuthCasoUso';

const UserRepo = () => Inject('AuthRepo');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @UserRepo() private readonly _authService: IAuthCasoUso,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { Usuario } = payload;
    const usuario = await this._authService.existeUsuario(Usuario);

    if (!usuario) {
      throw new UnauthorizedException(`El usuario no esta autenticado!`);
    }

    return payload;
  }
}
