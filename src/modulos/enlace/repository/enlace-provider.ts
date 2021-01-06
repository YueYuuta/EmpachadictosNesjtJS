import { Provider } from '@nestjs/common';
import { EnlaceRepoService } from './EnlaceRepoImplementacion';

export const EnlaceRepoProvider: Provider = {
  provide: 'EnlaceRepo',
  useClass: EnlaceRepoService,
};
