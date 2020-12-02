import { Provider } from '@nestjs/common';
import { AuthRepoService } from './AuthRepoImplementacion';

export const AuthRepoProvider: Provider = {
  provide: 'AuthRepo',
  useClass: AuthRepoService,
};
