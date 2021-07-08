import { Provider } from '@nestjs/common';
import { MenuAlmacenRepoService } from './MenuAlmacenRepoImplementacion';

export const MenuAlmacenRepoProvider: Provider = {
  provide: 'MenuAlmacenRepo',
  useClass: MenuAlmacenRepoService,
};
