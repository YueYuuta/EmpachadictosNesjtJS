import { Provider } from '@nestjs/common';
import { UsuarioAlmacenRepoService } from './UsuarioRepoImplementacion';

export const UsuarioAlmacenRepoProvider: Provider = {
  provide: 'UsuarioAlmacenRepo',
  useClass: UsuarioAlmacenRepoService,
};
