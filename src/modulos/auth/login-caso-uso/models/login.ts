import { LeerUAlmacenLoginDto } from '../dto/ualmacen-login.dto';
import { LeerUsuarioDto } from '@modulos/auth/api/dto/leer-usuario.dto';

export class Login {
  UsuarioAlmacen: LeerUAlmacenLoginDto[];
  Usuario: LeerUsuarioDto;
  Token: string;
}
