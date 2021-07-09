import { Provider } from '@nestjs/common';
import { DespacharRepoService } from './DespacharRepoImplementacion';

export const DespacharRepoProvider: Provider = {
  provide: 'DespacharRepo',
  useClass: DespacharRepoService,
};
