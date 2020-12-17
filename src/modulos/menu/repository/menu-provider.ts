import { Provider } from '@nestjs/common';
import { MenuRepoService } from './MenuRepoImplementacion';

export const MenuRepoProvider: Provider = {
  provide: 'MenuRepo',
  useClass: MenuRepoService,
};
