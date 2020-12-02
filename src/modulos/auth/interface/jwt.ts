export interface IJwtPayload {
  UsuarioID: number;
  Usuario: string;
  Correo: string;
  Rol: string;
  Iat?: Date;
}
