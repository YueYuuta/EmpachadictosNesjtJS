import { Provider } from '@nestjs/common';
import { RolRepoService } from './RolRepoImplementacion';

export const RolRepoProvider: Provider = {
  provide: 'RolRepo',
  useClass: RolRepoService,
};
