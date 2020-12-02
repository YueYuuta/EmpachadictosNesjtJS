import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from '../entidates/usuario.entity';

export const ObtenerUsuario = createParamDecorator(
  (data, ctx: ExecutionContext): Usuario =>
    ctx.switchToHttp().getRequest().user,
);
