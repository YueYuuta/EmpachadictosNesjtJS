import { Provider } from '@nestjs/common';
import { ProveedorRepoService } from './ProveedorRepoImplementacion';

export const ProveedorRepoProvider: Provider = {
  provide: 'ProveedorRepo',
  useClass: ProveedorRepoService,
};
