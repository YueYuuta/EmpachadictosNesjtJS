import { PipeTransform, BadGatewayException } from '@nestjs/common';
import { UsuarioRol } from '../enum/usuario-rol';

export class ValidarRole implements PipeTransform {
  readonly RolesValidos = [
    UsuarioRol.ADMINISTRATOR,
    UsuarioRol.ESPECIAL,
    UsuarioRol.VENDEDOR,
  ];
  transform(value: any) {
    const rol = value.Rol;
    if (rol) {
      const Rol = rol.toUpperCase();
      if (!this.esUnRoleValido(Rol)) {
        throw new BadGatewayException(`${rol} es un rol invalido `);
      }
      value.Rol = Rol;
    }
    return value;
  }
  private esUnRoleValido(rol: any) {
    const idx = this.RolesValidos.indexOf(rol);
    return idx !== -1;
  }
}
