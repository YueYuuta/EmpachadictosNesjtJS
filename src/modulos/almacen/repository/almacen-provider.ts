import { Provider } from '@nestjs/common';
import { AlmacenRepoService } from './UsuarioRepoImplementacion';

export const AlmacenRepoProvider: Provider = {
  provide: 'AlmacenRepo',
  useClass: AlmacenRepoService,
};
