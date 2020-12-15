import { Provider } from '@nestjs/common';
import { ClienteRepoService } from './ClienteRepoImplementacion';

export const ClienteRepoProvider: Provider = {
  provide: 'ClienteRepo',
  useClass: ClienteRepoService,
};
