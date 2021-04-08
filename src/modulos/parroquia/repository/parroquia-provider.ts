import { Provider } from '@nestjs/common';
import { ParroquiaRepoService } from './ParroquiaRepoImplementacion';

export const ParroquiaRepoProvider: Provider = {
  provide: 'ParroquiaRepo',
  useClass: ParroquiaRepoService,
};
