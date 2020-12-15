import { SetMetadata } from '@nestjs/common';

export const Ruta = (ruta: string) => SetMetadata('ruta', ruta);
