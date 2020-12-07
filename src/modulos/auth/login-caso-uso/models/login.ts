import { LeerUsuarioDto } from '@modulos/auth/api/dto/leer-usuario.dto';

export class Login {
  NumeroDeAlmacenes: number;
  Usuario: LeerUsuarioDto;
  Token: string;
  Almacen?: any;
}
