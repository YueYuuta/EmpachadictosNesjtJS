import { Provider } from '@nestjs/common';
import { CantonRepoService } from './CantonRepoImplementacion';

export const CantonRepoProvider: Provider = {
  provide: 'CantonRepo',
  useClass: CantonRepoService,
};
