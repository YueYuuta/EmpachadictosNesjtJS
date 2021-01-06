import { Provider } from '@nestjs/common';
import { ProvinciaRepoService } from './ProvinciaRepoImplementacion';

export const ProvinciaRepoProvider: Provider = {
  provide: 'ProvinciaRepo',
  useClass: ProvinciaRepoService,
};
