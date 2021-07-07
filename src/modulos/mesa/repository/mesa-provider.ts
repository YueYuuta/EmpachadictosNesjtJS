import { Provider } from '@nestjs/common';
import { MesaRepoService } from './MesaRepoImplementacion';

export const MesaRepoProvider: Provider = {
  provide: 'MesaRepo',
  useClass: MesaRepoService,
};
