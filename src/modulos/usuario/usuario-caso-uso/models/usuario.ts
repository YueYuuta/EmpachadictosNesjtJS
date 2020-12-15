import { UsuarioDetalleModel } from './usuario-detalle';
export class UsuarioModel {
  Usuario: string;
  Correo: string;
  Rol: any;
  Detalle: UsuarioDetalleModel;
  Fecha?: string;
  Contraseña?: string;
  NombreCompleto?: string;
  UsuarioID?: number;

  constructor(props: Omit<UsuarioModel, 'NombresCompleto'>) {
    Object.assign(this, props);
    this.NombreCompleto = `${props.Detalle.Nombres} ${props.Detalle.Apellidos}`;
  }
}
