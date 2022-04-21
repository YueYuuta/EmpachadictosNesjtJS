import { genSalt, hash, compare } from 'bcryptjs';
export class ProveedorBcrypt {
  public static async encriptarContra(Contraseña: string): Promise<string> {
    const salt: string = await genSalt(10);
    const contraEncryp: string = await hash(Contraseña, salt);
    return contraEncryp;
  }

  public static async compararContra(
    contraseña1: string,
    contraseña2: string,
  ): Promise<boolean> {
    const isMatch = await compare(contraseña1, contraseña2);
    return isMatch;
  }
}
