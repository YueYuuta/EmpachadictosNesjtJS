import { UsuarioDetalleModel } from './usuario-detalle';
export class UsuarioModel {
  Usuario: string;
  Correo: string;
  Rol: number;
  Detalle: UsuarioDetalleModel;
  NombreCompleto?: string;
  UsuarioID?: number;

  constructor(props: Omit<UsuarioModel, 'NombresCompleto'>) {
    Object.assign(this, props);
    this.NombreCompleto = `${props.Detalle.Nombres} ${props.Detalle.Apellidos}`;
  }
}
