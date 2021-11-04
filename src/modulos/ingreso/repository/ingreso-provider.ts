import { Provider } from '@nestjs/common';
import { IngresoRepoService } from './IngresoRepoImplementacion';

export const IngresoRepoProvider: Provider = {
  provide: 'IngresoRepo',
  useClass: IngresoRepoService,
};
