export interface IJwtPayload {
  UsuarioID: number;
  Usuario: string;
  Correo: string;
  Rol: any;
  Iat?: Date;
}
