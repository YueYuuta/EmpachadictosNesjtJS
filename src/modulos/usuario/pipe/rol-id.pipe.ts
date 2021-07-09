import { PipeTransform, BadGatewayException } from '@nestjs/common';

export class ValidarRoleId implements PipeTransform {
  transform(value: any) {
    const rol = value.Rol;
    try {
      value.Rol = Number(rol);
      return value;
    } catch (error) {
      throw new BadGatewayException(`${rol} formato incorrecto`);
    }
  }
}
