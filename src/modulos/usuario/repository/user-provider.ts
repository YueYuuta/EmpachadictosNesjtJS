import { Provider } from '@nestjs/common';
import { UsuarioRepoService } from './UsuarioRepoImplementacion';

export const UserRepoProvider: Provider = {
  provide: 'UserRepo',
  useClass: UsuarioRepoService,
};
